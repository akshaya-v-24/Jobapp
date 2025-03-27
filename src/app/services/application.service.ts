import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/applications'; // Adjust backend URL if needed

  constructor(private http: HttpClient) {}

  applyForJob(application: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseUrl}`, application);
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}`);
  }

  getApplicationsByJob(jobId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/job/${jobId}`);
  }

  getApplicationsByUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseUrl}/user/${userId}`);
  }
}
