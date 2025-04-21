package com.sims.controller;

import com.sims.entity.Inventory;
import com.sims.service.InventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<Inventory>> getInventoryByWarehouse(@PathVariable Long warehouseId) {
        return ResponseEntity.ok(inventoryService.getInventoryByWarehouse(warehouseId));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Inventory>> getInventoryByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getInventoryByProduct(productId));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Inventory>> getLowStockInventory() {
        return ResponseEntity.ok(inventoryService.getLowStockInventory());
    }

    @PutMapping("/update")
    public ResponseEntity<Inventory> updateInventory(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        Long warehouseId = Long.valueOf(request.get("warehouseId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());
        
        return ResponseEntity.ok(inventoryService.updateInventory(productId, warehouseId, quantity));
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferInventory(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        Long fromWarehouseId = Long.valueOf(request.get("fromWarehouseId").toString());
        Long toWarehouseId = Long.valueOf(request.get("toWarehouseId").toString());
        Integer quantity = Integer.valueOf(request.get("quantity").toString());
        
        inventoryService.transferInventory(productId, fromWarehouseId, toWarehouseId, quantity);
        return ResponseEntity.ok().build();
    }
} 