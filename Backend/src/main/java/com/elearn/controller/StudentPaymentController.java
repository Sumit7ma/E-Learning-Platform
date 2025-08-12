package com.elearn.controller;

import com.elearn.dto.TransactionDTO;
import com.elearn.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/student/payment")
@RequiredArgsConstructor
public class StudentPaymentController {

    private final PaymentService paymentService;

    @PostMapping("/success/{courseId}")
    public ResponseEntity<String> success(
            @PathVariable Long courseId,
            @AuthenticationPrincipal(expression = "username") String email) {
        paymentService.recordSuccessAndEnroll(courseId, email);
        return ResponseEntity.ok("Payment success and enrolled");
    }

    @PostMapping("/cancel/{courseId}")
    public ResponseEntity<String> cancel(
            @PathVariable Long courseId,
            @AuthenticationPrincipal(expression = "username") String email) {
        paymentService.recordCancel(courseId, email);
        return ResponseEntity.ok("Payment cancelled");
    }

    @GetMapping("/history")
    public ResponseEntity<List<TransactionDTO>> history(
            @AuthenticationPrincipal(expression = "username") String email) {
        return ResponseEntity.ok(paymentService.history(email));
    }
}
