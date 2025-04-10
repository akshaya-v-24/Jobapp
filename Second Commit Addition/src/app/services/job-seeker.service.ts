// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobSeekerService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService : AuthService) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`);
  }

  // updateProfile(profileData: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/users/me`, profileData);
  // }

  updateProfile(userId: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.baseUrl}/users/${userId}`, updatedData, { headers });
  }
  


  getJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs`);
  }

  // applyForJob(jobId: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/applications`, { jobId });
  // }

  applyForJob(jobId: number): Observable<any> {
    const token = localStorage.getItem('token'); // JWT
    const jobSeekerId = Number(localStorage.getItem('userId')); // Or wherever you're storing it
    const resume = "My resume goes here"; // Replace this with form input value if needed
    const coverLetter = "My cover letter goes here"; // Replace as needed
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const applicationRequest = {
      jobId: jobId,
      jobSeekerId: jobSeekerId,
      resume: resume,
      coverLetter: coverLetter
    };
  
    return this.http.post(`${this.baseUrl}/applications`, applicationRequest, { headers });
  }
  
  

 

  getApplicationStatus(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Ensure token is included
    });
    return this.http.get('http://localhost:8080/applications/status', { headers });
  }



  deleteApplication(applicationId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/applications/${applicationId}`;
    return this.http.delete(url, { headers });  // Pass the headers with token
  }
  
  
  
}
