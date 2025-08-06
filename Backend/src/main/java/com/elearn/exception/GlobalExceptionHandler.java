package com.elearn.exception;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException ex) {
	    String message = ex.getMessage();

	   
	    if (message != null && message.toLowerCase().contains("reset token")) {
	        message = "This reset link is invalid or already used. Please request a new one.";
	    } else if (message != null && message.toLowerCase().contains("expired")) {
	        message = "This reset link has expired. Please request a new one.";
	    }

	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(Map.of("message", message));
	}


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        String errorMsg = ex.getBindingResult()
                            .getFieldErrors()
                            .stream()
                            .findFirst()
                            .map(err -> err.getDefaultMessage())
                            .orElse("Validation error");

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", errorMsg));
    }
}
