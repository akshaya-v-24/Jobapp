// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';
// import { Job } from '../models/job.model';
// import { AuthService } from './auth.service'; // ✅ Ensure AuthService is used

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {
//   private apiUrl = 'http://localhost:8080/jobs'; // ✅ Change this if needed

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // ✅ Headers with JWT Token
//   private getAuthHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Authorization': `Bearer ${this.authService.getToken()}`,
//       'Content-Type': 'application/json'
//     });
//   }

//   // ✅ Fetch all jobs
//   getJobs(): Observable<Job[]> {
//     return this.http.get<Job[]>(this.apiUrl);
//   }

//   getJobsByEmployer(employerId: number): Observable<Job[]> {
//     return this.http.get<Job[]>(`${this.apiUrl}/employer/${employerId}`, { headers: this.getAuthHeaders() })
//       .pipe(catchError(this.handleError));
//   }
  

//   // ✅ Create a job
//   createJob(jobData: any): Observable<any> {
//     console.log("📤 Sending Job Data:", jobData); // Debugging Output
//     const formattedJob = {
//       ...jobData,
//       employer: { id: jobData.employerId }  // ✅ Ensure employer object is sent
//     };
//     return this.http.post(this.apiUrl, formattedJob, { headers: this.getAuthHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   // ✅ Update a job
//   updateJob(id: number, jobData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${id}`, jobData, { headers: this.getAuthHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   // ✅ Delete a job
//   deleteJob(id: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   // ✅ Fetch applicants for a job
//   getApplicantsByJobId(jobId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/${jobId}/applicants`);
//   }

//   // ✅ Error handling
//   private handleError(error: any) {
//     console.error("❌ API Error:", error);
//     return throwError(() => new Error(error.message || "Server Error"));
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = 'http://localhost:8080/jobs';

  constructor(private http: HttpClient) {}

  getJobsByEmployer(employerId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/employer/${employerId}`);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.baseUrl, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

    // ✅ Get applicants for a specific job
    // getApplicantsByJobId(jobId: number): Observable<Application[]> {
    //   return this.http.get<Application[]>(`${this.baseUrl}/${jobId}/applicants`);
    // }

    getApplicantsByJobId(jobId: number): Observable<Application[]> {
      const token = localStorage.getItem('token'); // Or from your AuthService
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Application[]>(`${this.baseUrl}/${jobId}/applicants`, { headers });
    }
    

    // updateApplicationStatus(applicationId: number, status: string) {
    //   return this.http.put(`/api/applications/${applicationId}/status`, status, {
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }

    updateApplicationStatus(applicationId: number, status: string) {
      return this.http.put(`/${applicationId}/status?status=${status}`, null, {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    

    
}
