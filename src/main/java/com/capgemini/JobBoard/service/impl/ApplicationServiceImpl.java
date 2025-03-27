//package com.capgemini.JobBoard.service.impl;
//
//
//import com.capgemini.JobBoard.dto.ApplicationRequest;
//import com.capgemini.JobBoard.model.Application;
//import com.capgemini.JobBoard.model.ApplicationStatus;
//import com.capgemini.JobBoard.model.Job;
//import com.capgemini.JobBoard.model.User;
//import com.capgemini.JobBoard.repository.ApplicationRepository;
//import com.capgemini.JobBoard.repository.JobRepository;
//import com.capgemini.JobBoard.repository.UserRepository;
//import com.capgemini.JobBoard.service.ApplicationService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ApplicationServiceImpl implements ApplicationService {
//
//    private final ApplicationRepository applicationRepository;
//    private final JobRepository jobRepository;
//    private final UserRepository userRepository;
//
//    public ApplicationServiceImpl(ApplicationRepository applicationRepository, 
//                                  JobRepository jobRepository,
//                                  UserRepository userRepository) {
//        this.applicationRepository = applicationRepository;
//        this.jobRepository = jobRepository;
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public Application applyForJob(ApplicationRequest request) {
//        Job job = jobRepository.findById(request.getJobId())
//            .orElseThrow(() -> new RuntimeException("Job not found"));
//
//        User jobSeeker = userRepository.findById(request.getJobSeekerId())
//            .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Application application = new Application();
//        application.setJob(job);
//        application.setJobSeeker(jobSeeker);
//        application.setResume(request.getResume());
//        application.setCoverLetter(request.getCoverLetter());
//        application.setStatus(ApplicationStatus.PENDING);
//
//        return applicationRepository.save(application);
//    }
//
//    @Override
//    public List<Application> getAllApplications() {
//        return applicationRepository.findAll();
//    }
//}


package com.capgemini.JobBoard.service.impl;

import com.capgemini.JobBoard.dto.ApplicationRequest;
import com.capgemini.JobBoard.model.*;
import com.capgemini.JobBoard.repository.ApplicationRepository;
import com.capgemini.JobBoard.repository.JobRepository;
import com.capgemini.JobBoard.repository.UserRepository;
import com.capgemini.JobBoard.service.ApplicationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  JobRepository jobRepository,
                                  UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Application applyForJob(ApplicationRequest request) {
        Job job = jobRepository.findById(request.getJobId())
            .orElseThrow(() -> new RuntimeException("Job not found"));

        User jobSeeker = userRepository.findById(request.getJobSeekerId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!jobSeeker.getRole().equals(Role.JOB_SEEKER)) {
            throw new RuntimeException("Only job seekers can apply for jobs");
        }

        Application application = new Application();
        application.setJob(job);
        application.setJobSeeker(jobSeeker);
        application.setResume(request.getResume());
        application.setCoverLetter(request.getCoverLetter());
        application.setStatus(ApplicationStatus.PENDING);

        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    @Override
    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
}

