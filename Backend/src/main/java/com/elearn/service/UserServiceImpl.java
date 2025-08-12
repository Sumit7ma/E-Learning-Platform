package com.elearn.service;

import com.elearn.dto.*;
import com.elearn.entity.*;
import com.elearn.repository.UserRepository;
import com.elearn.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder encoder;
    private final EmailService emailService;

    @Override
    public String registerStudent(SignupRequest req) {
        return register(req, Role.STUDENT);
    }

    @Override
    public String registerInstructor(SignupRequest req) {
        return register(req, Role.INSTRUCTOR);
    }

    private String register(SignupRequest req, Role role) {
        String email = req.getEmail().trim();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .name(req.getName().trim())
                .email(email)
                .password(encoder.encode(req.getPassword().trim()))
                .role(role)
                .build();

        userRepository.save(user);

       
        emailService.sendSimpleEmail(
            user.getEmail(),
            "Welcome to Courso!",
            "Hi " + user.getName() + ",\n\nWelcome to Courso! 🎉\nYou can now login and begin your journey.\n\nThanks,\nThe Courso Team"
        );

        return generateJwt(user);
    }

    @Override
    public String login(LoginRequest req) {
        String email = req.getEmail().trim();
        String password = req.getPassword().trim();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .build();

        return jwtUtils.generateJwtToken(userDetails, user.getRole().name());
    }

    private String generateJwt(User user) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .build();

        return jwtUtils.generateJwtToken(userDetails, user.getRole().name());
    }

    @Override
    public void createPasswordResetToken(String email) {
        email = email.trim();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetExpiry(LocalDateTime.now().plusMinutes(15)); 
        userRepository.save(user);

        emailService.sendResetEmail(user.getEmail(), token);
    }

    @Override
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        if (user.getResetExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token expired");
        }

        user.setPassword(encoder.encode(newPassword.trim())); 
        user.setResetToken(null); 
        user.setResetExpiry(null);
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email.trim())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .build();
    }
    @Override
    public String registerAdmin(SignupRequest req) {
        return register(req, Role.ADMIN);
    }

}
