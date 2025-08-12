package com.elearn.service;

import com.elearn.dto.TransactionDTO;
import java.util.List;

public interface PaymentService {
    void recordSuccessAndEnroll(Long courseId, String studentEmail);
    void recordCancel(Long courseId, String studentEmail);
    List<TransactionDTO> history(String studentEmail); // optional, for future history page
}
