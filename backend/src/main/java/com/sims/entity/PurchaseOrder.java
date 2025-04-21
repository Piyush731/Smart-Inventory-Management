package com.sims.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_orders")
@Data
@NoArgsConstructor
public class PurchaseOrder {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;
    
    @Column(name = "expected_delivery_date")
    private LocalDateTime expectedDeliveryDate;
    
    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @Column(name = "unit_price")
    private Double unitPrice;
    
    @Column(name = "total_amount")
    private Double totalAmount;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    public enum Status {
        PENDING,
        ORDERED,
        SHIPPED,
        DELIVERED,
        CANCELLED
    }
    
    @PrePersist
    public void prePersist() {
        if (orderDate == null) {
            orderDate = LocalDateTime.now();
        }
        if (status == null) {
            status = Status.PENDING;
        }
        if (unitPrice != null && quantity != null) {
            totalAmount = unitPrice * quantity;
        }
    }
} 