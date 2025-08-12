package com.elearn.dto;

import com.elearn.entity.PaymentStatus;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TransactionDTO {
    private Long id;
    private Long courseId;
    private String courseTitle;
    private Double amount;
    private PaymentStatus status;
    private String provider;
    private LocalDateTime timestamp;
}