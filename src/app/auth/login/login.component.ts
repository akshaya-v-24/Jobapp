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
  //   this.http.post<{ token: string, userId: number }>('http://localhost:8080/auth/login', this.credentials)
  //     .subscribe(
  //       response => {
  //         this.authService.setToken(response.token);  // Store JWT token
  //         this.authService.setUserId(response.userId); // Store user ID
          
  //         alert('Login successful!');
  //         this.router.navigate(['/jobs']); // Redirect after login
  //       },
  //       error => {
  //         console.error('Login failed:', error);
  //         this.errorMessage = 'Invalid credentials. Please try again.';
  //       }
  //     );
  // }

  login() {
    this.http.post<{ token: string, userId?: number }>('http://localhost:8080/auth/login', this.credentials)
      .subscribe(
        response => {
          if (response.token) {
            this.authService.setToken(response.token); // Store JWT token
          }
  
          if (response.userId !== undefined) {
            this.authService.setUserId(response.userId); // Store user ID
            alert('Login successful!');
            this.router.navigate(['/jobs']); // Redirect after login
          } else {
            console.error('userId is missing in the response:', response);
            this.errorMessage = 'Login failed. Please try again.';
          }
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }
  
}
