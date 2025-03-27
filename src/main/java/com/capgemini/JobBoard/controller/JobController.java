//
//package com.capgemini.JobBoard.controller;
//
//import com.capgemini.JobBoard.model.Job;
//import com.capgemini.JobBoard.repository.JobRepository;
//import com.capgemini.JobBoard.service.JobService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/jobs")
//@CrossOrigin(origins = "http://localhost:4200")
//public class JobController {
//
//    private final JobService jobService;
//    private final JobRepository jobRepository;
//    
//    public JobController(JobService jobService, JobRepository jobRepository) {
//		super();
//		this.jobService = jobService;
//		this.jobRepository = jobRepository;
//	}
//
//	@GetMapping
//    public ResponseEntity<List<Job>> getAllJobs() {
//        List<Job> jobs = jobService.getAllJobs();
//        return ResponseEntity.ok(jobs);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
//        Job job = jobService.getJobById(id);
//        return job != null ? ResponseEntity.ok(job) : ResponseEntity.notFound().build();
//    }
//
//    @PostMapping
//    public ResponseEntity<Job> createJob(@RequestBody Job job) {
//        Job newJob = jobService.createJob(job);
//        return ResponseEntity.status(201).body(newJob); // HTTP 201 Created
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
//        Job updatedJob = jobService.updateJob(id, jobDetails);
//        return updatedJob != null ? ResponseEntity.ok(updatedJob) : ResponseEntity.notFound().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
//        jobService.deleteJob(id);
//        return ResponseEntity.noContent().build(); // HTTP 204 No Content
//    }
//    
//    @GetMapping
//    public ResponseEntity<List<Job>> getAllJobs(@RequestParam(required = false) String jobType) {
//        List<Job> jobs;
//        if (jobType != null && !jobType.isEmpty()) {
//            jobs = jobRepository.findByJobType(jobType); // Ensure this method exists in JobRepository
//        } else {
//            jobs = jobRepository.findAll();
//        }
//        return ResponseEntity.ok(jobs);
//    }
//
//}
//


package com.capgemini.JobBoard.controller;

import com.capgemini.JobBoard.model.Job;
import com.capgemini.JobBoard.repository.JobRepository;
import com.capgemini.JobBoard.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:4200")
public class JobController {

    private final JobService jobService;
    private final JobRepository jobRepository;
    
    public JobController(JobService jobService, JobRepository jobRepository) {
        this.jobService = jobService;
        this.jobRepository = jobRepository;
    }

    // Get all jobs or filter by jobType
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(@RequestParam(required = false) String jobType) {
        List<Job> jobs;
        if (jobType != null && !jobType.isEmpty()) {
            jobs = jobRepository.findByJobType(jobType);
        } else {
            jobs = jobService.getAllJobs();
        }
        return ResponseEntity.ok(jobs);
    }

    // Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        Job job = jobService.getJobById(id);
        return job != null ? ResponseEntity.ok(job) : ResponseEntity.notFound().build();
    }

    // Create a new job
    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        Job newJob = jobService.createJob(job);
        return ResponseEntity.status(201).body(newJob); // HTTP 201 Created
    }

    // Update an existing job
    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
        Job updatedJob = jobService.updateJob(id, jobDetails);
        return updatedJob != null ? ResponseEntity.ok(updatedJob) : ResponseEntity.notFound().build();
    }

    // Delete a job
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build(); // HTTP 204 No Content
    }
}

