import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

 
  
  // login() {
  //   this.http.post<{ token: string, userId?: number, role?: string }>('http://localhost:8080/auth/login', this.credentials)
  //     .subscribe(
  //       response => {
  //         console.log('Login Response:', response); // Debugging
  
  //         if (response.token) {
  //           this.authService.setToken(response.token); 
  //           localStorage.setItem('token', response.token); // Ensure token is stored
  //         } else {
  //           console.error('Token missing in response!');
  //           return;
  //         }
  
  //         if (response.userId !== undefined) {
  //           this.authService.setUserId(response.userId);
  //           localStorage.setItem('userId', response.userId.toString());
  //         }
  
  //         if (response.role) {
  //           this.authService.setUserRole(response.role);
  //           localStorage.setItem('role', response.role);
  //         }
  
  //         alert('Login successful!');
  
  //         setTimeout(() => {
  //           if (response.role === 'EMPLOYER') {
  //             console.log('Navigating to: /employer-dashboard');
  //             this.router.navigate(['/employer-dashboard']);
  //           } else if (response.role === 'JOB_SEEKER') {
  //             console.log('Navigating to: /job-seeker/profile');
  //             this.router.navigate(['/job-seeker/profile']);
  //           } else {
  //             console.error('Unknown role:', response.role);
  //             this.errorMessage = 'Unknown user role. Please contact support.';
  //           }
  //         }, 100); // Small delay to ensure token is stored
  //       },
  //       error => {
  //         console.error('Login failed:', error);
  //         this.errorMessage = 'Invalid credentials. Please try again.';
  //       }
  //     );
  // }
  

  login() {
    this.http.post<{ token: string, userId?: number, role?: string }>('http://localhost:8080/auth/login', this.credentials)
      .subscribe(
        response => {
          console.log('Login Response:', response); // Debugging
  
          if (response.token) {
            this.authService.setToken(response.token); 
            localStorage.setItem('token', response.token); 
          } else {
            console.error('Token missing in response!');
            return;
          }
  
          if (response.userId !== undefined) {
            this.authService.setUserId(response.userId);
            localStorage.setItem('userId', response.userId.toString());
          }
  
          if (response.role) {
            this.authService.setUserRole(response.role);
            localStorage.setItem('role', response.role);
          }
  
          alert('Login successful!');
  
          setTimeout(() => {
            if (response.role === 'EMPLOYER') {
              console.log('Navigating to: /employer-dashboard');
              this.router.navigate(['/employer-dashboard']);
            } else if (response.role === 'JOB_SEEKER') {
              console.log('Navigating to: /job-seeker/profile');
              this.router.navigate(['/job-seeker/profile']);
            } else if (response.role === 'ADMIN') {
              console.log('Navigating to: /admin-dashboard');
              this.router.navigate(['/admin-dashboard']);
            } else {
              console.error('Unknown role:', response.role);
              this.errorMessage = 'Unknown user role. Please contact support.';
            }
          }, 100);
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }
  
  
}
