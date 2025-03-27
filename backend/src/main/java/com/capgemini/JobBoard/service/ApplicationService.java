//package com.capgemini.JobBoard.service;
//
//
//
//import com.capgemini.JobBoard.dto.ApplicationRequest;
//import com.capgemini.JobBoard.model.Application;
//import java.util.List;
//
//public interface ApplicationService {
//    Application applyForJob(ApplicationRequest request);
//    List<Application> getAllApplications();
//}
//

package com.capgemini.JobBoard.service;

import com.capgemini.JobBoard.dto.ApplicationRequest;
import com.capgemini.JobBoard.model.Application;

import java.util.List;

public interface ApplicationService {

    Application applyForJob(ApplicationRequest request);

    List<Application> getAllApplications();

    List<Application> getApplicationsByJobId(Long jobId);

    List<Application> getApplicationsByUserId(Long userId);
}

