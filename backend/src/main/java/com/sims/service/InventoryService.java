package com.sims.service;

import com.sims.entity.Inventory;
import com.sims.entity.Product;
import com.sims.entity.Warehouse;
import com.sims.repository.InventoryRepository;
import com.sims.repository.ProductRepository;
import com.sims.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository,
                          ProductRepository productRepository,
                          WarehouseRepository warehouseRepository,
                          KafkaTemplate<String, String> kafkaTemplate) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.warehouseRepository = warehouseRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getInventoryByWarehouse(Long warehouseId) {
        return inventoryRepository.findByWarehouseId(warehouseId);
    }

    public List<Inventory> getInventoryByProduct(Long productId) {
        return inventoryRepository.findByProductId(productId);
    }

    public List<Inventory> getLowStockInventory() {
        return inventoryRepository.findLowStockInventory();
    }

    @Transactional
    public Inventory updateInventory(Long productId, Long warehouseId, Integer quantity) {
        Optional<Inventory> existingInventory = inventoryRepository.findByProductAndWarehouse(productId, warehouseId);
        
        if (existingInventory.isPresent()) {
            Inventory inventory = existingInventory.get();
            inventory.setQuantity(quantity);
            inventory = inventoryRepository.save(inventory);
            
            // Send Kafka event
            kafkaTemplate.send("stock-events", 
                String.format("Stock updated - Product: %d, Warehouse: %d, Quantity: %d", 
                    productId, warehouseId, quantity));
            
            return inventory;
        } else {
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));
            
            Inventory newInventory = new Inventory();
            newInventory.setProduct(product);
            newInventory.setWarehouse(warehouse);
            newInventory.setQuantity(quantity);
            
            Inventory savedInventory = inventoryRepository.save(newInventory);
            
            // Send Kafka event
            kafkaTemplate.send("stock-events", 
                String.format("New stock added - Product: %d, Warehouse: %d, Quantity: %d", 
                    productId, warehouseId, quantity));
            
            return savedInventory;
        }
    }

    @Transactional
    public void transferInventory(Long productId, Long fromWarehouseId, Long toWarehouseId, Integer quantity) {
        Inventory fromInventory = inventoryRepository.findByProductAndWarehouse(productId, fromWarehouseId)
            .orElseThrow(() -> new RuntimeException("Source inventory not found"));
        
        if (fromInventory.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for transfer");
        }
        
        // Update source inventory
        fromInventory.setQuantity(fromInventory.getQuantity() - quantity);
        inventoryRepository.save(fromInventory);
        
        // Update or create destination inventory
        updateInventory(productId, toWarehouseId, 
            inventoryRepository.findByProductAndWarehouse(productId, toWarehouseId)
                .map(inv -> inv.getQuantity() + quantity)
                .orElse(quantity));
        
        // Send Kafka event
        kafkaTemplate.send("stock-events", 
            String.format("Stock transferred - Product: %d, From: %d, To: %d, Quantity: %d", 
                productId, fromWarehouseId, toWarehouseId, quantity));
    }
} 