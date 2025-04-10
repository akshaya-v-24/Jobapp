


import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { email: '', password: '', role: 'JOB_SEEKER' ,name: ''};
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  

  // register() {
  //   this.authService.register(this.user).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful:', response);
  //       window.alert('✅ Registered successfully. Please login to enter dashboard.');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => {
  //       console.error('Error during registration:', err);
  //       this.errorMessage = err.error?.message || 'Registration failed. Try again.';
  //     }
  //   });
  // }

  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        window.alert('✅ Registered successfully. Admin has been notified.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during registration:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
      }
    });
  }
  
  
}
