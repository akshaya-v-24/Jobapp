//
//package com.capgemini.JobBoard.controller;
//
//import com.capgemini.JobBoard.dto.ApplicationRequest;
//import com.capgemini.JobBoard.model.Application;
//
//import com.capgemini.JobBoard.service.ApplicationService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/applications")
//@CrossOrigin(origins = "http://localhost:4200")
//public class ApplicationController {
//
//    private final ApplicationService applicationService;
//
//    public ApplicationController(ApplicationService applicationService) {
//        this.applicationService = applicationService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Application> applyForJob(@RequestBody ApplicationRequest request) {
//        Application newApplication = applicationService.applyForJob(request);
//        return ResponseEntity.ok(newApplication);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Application>> getAllApplications() {
//        List<Application> applications = applicationService.getAllApplications();
//        return ResponseEntity.ok(applications);
//    }
//}


package com.capgemini.JobBoard.controller;

import com.capgemini.JobBoard.dto.ApplicationRequest;
import com.capgemini.JobBoard.model.Application;
import com.capgemini.JobBoard.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:4200")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<Application> applyForJob(@RequestBody ApplicationRequest request) {
        Application newApplication = applicationService.applyForJob(request);
        return ResponseEntity.ok(newApplication);
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJobId(@PathVariable Long jobId) {
        List<Application> applications = applicationService.getApplicationsByJobId(jobId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable Long userId) {
        List<Application> applications = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(applications);
    }
}
