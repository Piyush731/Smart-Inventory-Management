package com.sims.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "warehouse_id", nullable = false)
    private Warehouse warehouse;
    
    public Product getProduct() {
        return product;
    }
    
    public void setProduct(Product product) {
        this.product = product;
    }
    
    public Warehouse getWarehouse() {
        return warehouse;
    }
    
    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
    
    @Column(nullable = false)
    private Integer quantity;
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @PrePersist
    @PreUpdate
    public void updateStatus() {
        if (quantity <= 0) {
            status = Status.OUT_OF_STOCK;
        } else if (product != null && product.getSafetyStockLevel() != null && 
                  quantity <= product.getSafetyStockLevel()) {
            status = Status.LOW_STOCK;
        } else {
            status = Status.IN_STOCK;
        }
        lastUpdated = LocalDateTime.now();
    }
    
    public enum Status {
        IN_STOCK,
        LOW_STOCK,
        OUT_OF_STOCK
    }
} 