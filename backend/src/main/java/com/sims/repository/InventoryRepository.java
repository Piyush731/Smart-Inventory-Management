package com.sims.repository;

import com.sims.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    
    List<Inventory> findByWarehouseId(Long warehouseId);
    
    List<Inventory> findByProductId(Long productId);
    
    @Query("SELECT i FROM Inventory i WHERE i.quantity <= i.reorderPoint")
    List<Inventory> findLowStockInventory();
    
    @Query("SELECT i FROM Inventory i WHERE i.quantity = 0")
    List<Inventory> findOutOfStockInventory();
    
    @Query("SELECT i FROM Inventory i WHERE i.product.id = ?1 AND i.warehouse.id = ?2")
    Optional<Inventory> findByProductAndWarehouse(Long productId, Long warehouseId);
} 