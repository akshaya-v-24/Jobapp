


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/applications'; // Backend API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Get JWT from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // 🔥 Ensure JWT is sent
      'Content-Type': 'application/json'
    });
  }

  applyForJob(application: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}`, application, {
      headers: this.getAuthHeaders()
    });
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  getApplicationsByJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/job/${jobId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getApplicationsByUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Add the delete method
  deleteApplication(applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${applicationId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getApplicationsByEmployer(employerId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/employer/${employerId}`);
  }


  // updateApplicationStatus(applicationId: number, status: string) {
  //   return this.http.put(
  //     `${this.baseUrl}/${applicationId}/status`,
  //     { status },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //       responseType: 'text' as 'json' // 👈 This is the trick
  //     }
  //   );
  // }
  updateApplicationStatus(applicationId: number, status: string) {
    const statusValue = status.toUpperCase(); // Ensure it's uppercase
    return this.http.put(
      `${this.baseUrl}/${applicationId}/status`,
      { status: statusValue },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text' as 'json'
      }
    );
  }
  
  
  
  
}
