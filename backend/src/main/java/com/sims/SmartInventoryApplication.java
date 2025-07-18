package com.sims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartInventoryApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartInventoryApplication.class, args);
    }
} 