package com.sims.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "min_stock_level")
    private Integer minStockLevel;
    
    @Column(name = "max_stock_level")
    private Integer maxStockLevel;
    
    @Column(name = "safety_stock_level")
    private Integer safetyStockLevel;
    
    @Column(name = "lead_time_days")
    private Integer leadTimeDays;
    
    @Column(nullable = false)
    private Integer quantity;
    
    // Explicit getter for safetyStockLevel
    public Integer getSafetyStockLevel() {
        return safetyStockLevel;
    }
} 