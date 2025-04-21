package com.sims.repository;

import com.sims.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategory(String category);
    
    @Query("SELECT p FROM Product p WHERE p.quantity <= p.safetyStockLevel")
    List<Product> findProductsNeedingRestock();
    
    @Query("SELECT p FROM Product p WHERE p.quantity <= p.minStockLevel")
    List<Product> findLowStockProducts();
} 