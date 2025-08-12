package com.elearn.config;

import com.elearn.security.JwtAuthFilter;
import com.elearn.security.JwtEntryPoint;
import com.elearn.security.JwtUtils;
import com.elearn.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtEntryPoint unauthorizedHandler;
    private final JwtUtils jwtUtils;

    @Bean
    public JwtAuthFilter jwtAuthFilter(@Lazy UserService userService) {
        return new JwtAuthFilter(jwtUtils, userService);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
            .authorizeHttpRequests(auth -> auth
            	    .requestMatchers(
            	        "/api/auth/signup/**",
            	        "/api/auth/login",
            	        "/api/auth/forgot-password",
            	        "/api/auth/reset-password/**",
            	        "/swagger-ui/**",
            	        "/v3/api-docs/**",
            	        "/swagger-resources/**",
            	        "/webjars/**",
            	        "/api/courses/**"  
            	    ).permitAll()
            	    .requestMatchers("/api/student/payment/").authenticated()
            	    .requestMatchers("/api/instructor/**").hasRole("INSTRUCTOR")
            	    .anyRequest().authenticated()
            	)

            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
