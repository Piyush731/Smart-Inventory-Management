package com.sims.repository;

import com.sims.entity.PurchaseOrder;
import com.sims.entity.PurchaseOrder.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    
    List<PurchaseOrder> findByStatus(Status status);
    
    List<PurchaseOrder> findBySupplierId(Long supplierId);
    
    List<PurchaseOrder> findByProductId(Long productId);
    
    @Query("SELECT po FROM PurchaseOrder po WHERE po.expectedDeliveryDate <= ?1 AND po.status = 'ORDERED'")
    List<PurchaseOrder> findOverdueOrders(LocalDateTime currentDate);
    
    @Query("SELECT po FROM PurchaseOrder po WHERE po.orderDate BETWEEN ?1 AND ?2")
    List<PurchaseOrder> findOrdersBetweenDates(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT po FROM PurchaseOrder po WHERE po.product.id = ?1 AND po.status = 'ORDERED'")
    List<PurchaseOrder> findActiveOrdersForProduct(Long productId);
} 