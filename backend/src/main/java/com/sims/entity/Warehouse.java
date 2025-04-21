package com.sims.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "warehouses")
@Data
@NoArgsConstructor
public class Warehouse {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String location;
    
    @Column(name = "capacity")
    private Integer capacity;
    
    @Column(name = "current_utilization")
    private Integer currentUtilization;
    
    @Column(name = "contact_person")
    private String contactPerson;
    
    @Column(name = "contact_phone")
    private String contactPhone;
} 