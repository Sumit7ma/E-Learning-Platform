package com.elearn.controller;

import com.elearn.dto.*;
import com.elearn.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@SecurityRequirement(name = "bearerAuth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup/student")
    public ResponseEntity<Map<String, String>> signupStudent(@Validated @RequestBody SignupRequest req) {
        String token = userService.registerStudent(req);
        return ResponseEntity.status(201).body(Map.of("token", token));
    }

    @PostMapping("/signup/instructor")
    public ResponseEntity<Map<String, String>> signupInstructor(@Validated @RequestBody SignupRequest req) {
        String token = userService.registerInstructor(req);
        return ResponseEntity.status(201).body(Map.of("token", token));
    }
    @PostMapping("/signup/admin")
    public ResponseEntity<Map<String, String>> signupAdmin(@Validated @RequestBody SignupRequest req) {
        String token = userService.registerAdmin(req);
        return ResponseEntity.status(201).body(Map.of("token", token));
    }



    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Validated @RequestBody LoginRequest req) {
        String token = userService.login(req);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> payload) {
        userService.createPasswordResetToken(payload.get("email"));
        return ResponseEntity.ok(Map.of("message", "Reset link sent to email"));
    }

    @PostMapping("/reset-password/{token}")
    public ResponseEntity<Map<String, String>> resetPassword(@PathVariable String token,
                                                              @Validated @RequestBody ResetPasswordDTO dto) {
        userService.resetPassword(token, dto.getNewPassword());
        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
    }
    
}
