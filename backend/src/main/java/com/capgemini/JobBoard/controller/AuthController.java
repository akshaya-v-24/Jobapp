////package com.capgemini.JobBoard.controller;
////
////
////import org.springframework.web.bind.annotation.*;
////
////import com.capgemini.JobBoard.dto.AuthRequest;
////import com.capgemini.JobBoard.dto.AuthResponse;
////import com.capgemini.JobBoard.model.User;
////import com.capgemini.JobBoard.service.AuthService;
////
////@RestController
////@RequestMapping("/auth")
////@CrossOrigin(origins = "http://localhost:4200")
////public class AuthController {
////    private final AuthService authService;
////
////    public AuthController(AuthService authService) {
////        this.authService = authService;
////    }
////
////    @PostMapping("/register")
////    public String register(@RequestBody User user) {
////        return authService.register(user);
////    }
////
////    @PostMapping("/login")
////    public AuthResponse login(@RequestBody AuthRequest request) {
////        return authService.login(request);
////    }
////}
//
//package com.capgemini.JobBoard.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.capgemini.JobBoard.dto.AuthRequest;
//import com.capgemini.JobBoard.dto.AuthResponse;
//import com.capgemini.JobBoard.model.User;
//import com.capgemini.JobBoard.service.AuthService;
//
//import java.util.Collections;
//
//@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:4200")
//public class AuthController {
//    private final AuthService authService;
//
//    public AuthController(AuthService authService) {
//        this.authService = authService;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody User user) {
//        try {
//            String response = authService.register(user);
//            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
//        } catch (IllegalStateException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Something went wrong. Please try again."));
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//        try {
//            AuthResponse response = authService.login(request);
//            return ResponseEntity.ok(response);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", e.getMessage()));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Login failed. Please try again."));
//        }
//    }
//    
//    
//
//}


package com.capgemini.JobBoard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.capgemini.JobBoard.dto.AuthRequest;
import com.capgemini.JobBoard.dto.AuthResponse;
import com.capgemini.JobBoard.model.User;
import com.capgemini.JobBoard.service.AuthService;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            String response = authService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", response));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Something went wrong. Please try again."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error", "Login failed. Please try again."));
        }
    }
}
