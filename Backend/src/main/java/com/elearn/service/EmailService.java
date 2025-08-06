package com.elearn.service;

public interface EmailService {
    void sendResetEmail(String to, String token);
    void sendSimpleEmail(String to, String subject, String body);
}
