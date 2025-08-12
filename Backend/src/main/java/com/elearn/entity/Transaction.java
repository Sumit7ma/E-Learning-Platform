package com.elearn.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long courseId;
    private String courseTitle;
    private Double amount;
    private LocalDateTime timestamp;

  
    public Transaction() {}

    public Transaction(Long studentId, Long courseId, String courseTitle, Double amount) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
    }

 
}
