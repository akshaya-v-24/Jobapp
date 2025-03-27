//package com.capgemini.JobBoard.service;
//
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.capgemini.JobBoard.dto.AuthRequest;
//import com.capgemini.JobBoard.dto.AuthResponse;
//import com.capgemini.JobBoard.model.User;
//import com.capgemini.JobBoard.repository.UserRepository;
//import com.capgemini.JobBoard.security.JwtUtil;
//
//@Service
//public class AuthService {
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final JwtUtil jwtUtil;
//
//    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
//                       AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//    }
//
//
//    
//    public String register(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword())); // Ensure encoding
//        userRepository.save(user);
//        return jwtUtil.generateToken(user.getEmail());
//    }
//
//
//    
//    public AuthResponse login(AuthRequest request) {
//        try {
//            authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//            );
//            String token = jwtUtil.generateToken(request.getEmail());
//            return new AuthResponse(token);
//        } catch (Exception e) {
//            throw new RuntimeException("Invalid email or password");
//        }
//    }
//
//}


package com.capgemini.JobBoard.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.capgemini.JobBoard.dto.AuthRequest;
import com.capgemini.JobBoard.dto.AuthResponse;
import com.capgemini.JobBoard.model.User;
import com.capgemini.JobBoard.repository.UserRepository;
import com.capgemini.JobBoard.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public String register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode password
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail());
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtil.generateToken(request.getEmail());

        // Fetch user from DB
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new AuthResponse(token, user.getId()); // Return token + userId
    }
}
