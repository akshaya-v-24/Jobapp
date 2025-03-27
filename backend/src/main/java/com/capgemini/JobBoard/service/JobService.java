
package com.capgemini.JobBoard.service;

import com.capgemini.JobBoard.model.Job;

import java.util.List;

public interface JobService {
    List<Job> getAllJobs();
    Job getJobById(Long id);
    Job createJob(Job job);
    Job updateJob(Long id, Job jobDetails);
    void deleteJob(Long id);
}

