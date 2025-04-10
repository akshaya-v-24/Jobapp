
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Employer } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Update if needed

  constructor(private http: HttpClient) {}

  // User registration
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  

login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((response: any) => {
      console.log('🔹 AuthService - Login response:', response);

      if (response.token) {
        this.setToken(response.token);
        this.setUserId(response.userId);
        this.setUserRole(response.role);

        // ✅ Store employerId as a number (not an object)
        if (response.role === 'EMPLOYER' && response.employerId) {
          this.setEmployerId(response.employerId);
          console.log('✅ AuthService - Employer ID stored:', response.employerId);
        } else {
          console.warn('⚠️ AuthService - No employerId found in response.');
        }
      }

      console.log('🛠️ AuthService - employerId in localStorage:', localStorage.getItem('employerId'));
    })
  );
}





  // Store token in local storage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

 
  setToken(token: string): void {
    if (token) {
      localStorage.setItem('jwtToken', token);
      console.log('AuthService - Token stored successfully');
    } else {
      console.error('AuthService - Invalid token received:', token);
    }
  }
  

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('authToken'); // Ensure all tokens are cleared
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role on logout
    
  }

 

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      console.warn('AuthService - No token found, user is not authenticated');
      return false;
    }
  
    // Optional: Check if token is expired (if using JWT expiration)
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) {
        console.warn('AuthService - Token expired');
        this.logout();
        return false;
      }
    } catch (error) {
      console.error('AuthService - Invalid token format', error);
      return false;
    }
  
    return true;
  }
  

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;  // Ensure it's a number
  }

 
  

  setUserId(userId: number | null): void {
    if (userId !== null && userId !== undefined) {
      localStorage.setItem('userId', userId.toString());
    } else {
      console.error('Invalid userId received:', userId);
    }
  }

  /** ✅ Set user role in localStorage */
  setUserRole(role: string): void {
    localStorage.setItem('role', role);
    console.log('AuthService - Stored role:', role);
  }

  /** ✅ Get user role from localStorage */
  getUserRole(): string {
    const role = localStorage.getItem('role') || '';
    console.log('AuthService - Retrieved role:', role);
    return role;
  }

  /** ✅ Check if user is an Employer */
  isEmployer(): boolean {
    return this.getUserRole() === 'EMPLOYER';
  }

  /** ✅ Check if user is a Job Seeker */
  isJobSeeker(): boolean {
    return this.getUserRole() === 'JOB_SEEKER';
  }


  getEmployerId(): number | null {
    const employerId = localStorage.getItem('employerId');
    return employerId ? parseInt(employerId, 10) : null; // ✅ Convert back to number
  }
  setEmployerId(employerId: number): void {
    localStorage.setItem('employerId', employerId.toString()); // ✅ Store as string
  }
  
  
}
