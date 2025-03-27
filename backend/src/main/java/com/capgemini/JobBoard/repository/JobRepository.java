//package com.capgemini.JobBoard.repository;
//
//public interface JobRepository {
//
//}


package com.capgemini.JobBoard.repository;

import com.capgemini.JobBoard.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployerId(Long employerId);
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByJobType(String jobType); // New method to filter by jobType 
    
    List<Job> findByTitleContainingIgnoreCaseAndJobType(String title, String jobType);
    
    
}


