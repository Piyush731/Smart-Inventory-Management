package com.sims.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
public class Supplier {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String contactPerson;
    
    @Column(nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String address;
    
    @ManyToMany
    @JoinTable(
        name = "supplier_products",
        joinColumns = @JoinColumn(name = "supplier_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> productsSupplied;
    
    @Column(name = "average_lead_time_days")
    private Integer averageLeadTimeDays;
    
    @Column(name = "reliability_rating")
    private Double reliabilityRating;
} 