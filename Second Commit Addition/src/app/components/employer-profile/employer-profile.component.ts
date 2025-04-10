// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employer-profile',
//   imports: [],
//   templateUrl: './employer-profile.component.html',
//   styleUrl: './employer-profile.component.css'
// })
// export class EmployerProfileComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { JobSeekerService } from '../../services/job-seeker.service';

@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit {
  profile: any = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private jobSeekerService: JobSeekerService
  ) {}

  
  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    const token = this.authService.getToken();
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get('http://localhost:8080/users/me', { headers }).subscribe({
      next: (data) => this.profile = data,
      error: (err) => console.error('Error fetching profile:', err)
    });
  }

  updateProfile() {
    if (!this.profile.id) return;

    this.jobSeekerService.updateProfile(this.profile.id, this.profile).subscribe({
      next: () => alert("Employer profile updated successfully!"),
      error: (err) => alert("Error updating profile.")
    });
  }
}
