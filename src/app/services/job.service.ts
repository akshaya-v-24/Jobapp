import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { AuthService } from './auth.service';  // ✅ Import AuthService

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/jobs'; // Backend API

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // ✅ Attach JWT token
    });
  }

  // getJobs(): Observable<Job[]> {
  //   return this.http.get<Job[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  // }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job, { headers: this.getAuthHeaders() });
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/${id}`, job, { headers: this.getAuthHeaders() });
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  applyForJob(application: any): Observable<any> {
    return this.http.post('http://localhost:8080/applications', application);
  }
  
}
