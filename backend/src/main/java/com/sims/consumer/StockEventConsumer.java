package com.sims.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class StockEventConsumer {

    private static final Logger logger = LoggerFactory.getLogger(StockEventConsumer.class);

    @KafkaListener(topics = "stock-events", groupId = "sims-group")
    public void consumeStockEvent(String message) {
        logger.info("Received stock event: {}", message);
        // Here you can add logic to process the stock event
        // For example, update Redis cache, send notifications, etc.
    }

    @KafkaListener(topics = "po-events", groupId = "sims-group")
    public void consumePurchaseOrderEvent(String message) {
        logger.info("Received purchase order event: {}", message);
        // Process purchase order events
    }
} 