package com.elearn.service;

import com.elearn.dto.LoginRequest;
import com.elearn.dto.SignupRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    String registerStudent(SignupRequest req);
    String registerInstructor(SignupRequest req);
    String login(LoginRequest req);
    String registerAdmin(SignupRequest req); 

    void createPasswordResetToken(String email);
    void resetPassword(String token, String newPassword);
}
