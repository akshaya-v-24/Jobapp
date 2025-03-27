

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // User login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
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
    localStorage.setItem('authToken', token); // Store token in localStorage
  }

  // Remove token (Logout)
  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

 
  // getUserId(): number | null {
  //   const userId = localStorage.getItem('userId'); // Retrieve user ID from storage
  //   return userId ? parseInt(userId, 10) : null;
  // }

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
  

  // setUserId(userId: number): void {
  //   localStorage.setItem('userId', userId.toString()); // Store user ID after login
  // }

 
}
