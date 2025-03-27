//package com.capgemini.JobBoard.repository;
//
//public interface ApplicationRepository {
//
//}


package com.capgemini.JobBoard.repository;

import com.capgemini.JobBoard.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByJobId(Long jobId);
    //List<Application> findByUserId(Long userId);
    @Query("SELECT a FROM Application a WHERE a.jobSeeker.id = :userId")
    List<Application> findByUserId(@Param("userId") Long userId);

}
