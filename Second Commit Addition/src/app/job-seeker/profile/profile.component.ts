// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-profile',
// //   imports: [],
// //   templateUrl: './profile.component.html',
// //   styleUrl: './profile.component.css'
// // })
// // export class ProfileComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { JobSeekerService } from '../../services/job-seeker.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// //import { JobSeekerService } from 'src/app/services/job-seeker.service';

// @Component({
//   selector: 'app-profile',
//   standalone: true,
//   imports: [CommonModule,FormsModule],
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   profile: any = {};

//   constructor(private jobSeekerService: JobSeekerService) {}

//   ngOnInit() {
//     this.loadProfile();
//   }

//   loadProfile() {
//     this.jobSeekerService.getProfile().subscribe((data) => {
//       this.profile = data;
//     });
//   }

//   updateProfile() {
//     this.jobSeekerService.updateProfile(this.profile).subscribe(() => {
//       alert('Profile updated successfully!');
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobSeekerService } from '../../services/job-seeker.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {};

  constructor(private http: HttpClient, private authService: AuthService,private jobSeekerService : JobSeekerService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    const token = this.authService.getToken(); // Get token from local storage
    if (!token) {
      console.error('No token found, user is not authenticated.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Attach token in request
      'Content-Type': 'application/json'
    });

    this.http.get('http://localhost:8080/users/me', { headers })
      .subscribe({
        next: (data) => {
          this.profile = data; // Load user profile data
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });
  }

  // updateProfile(): void {
  //   const token = this.authService.getToken();
  //   if (!token) {
  //     console.error('No token found, user is not authenticated.');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   this.http.put('http://localhost:8080/users/id', this.profile, { headers })
  //     .subscribe({
  //       next: () => {
  //         alert('Profile updated successfully!');
  //       },
  //       error: (err) => {
  //         console.error('Error updating profile:', err);
  //       }
  //     });
  // }

  updateProfile() {
    if (!this.profile.id) {
      console.error("User ID is missing");
      return;
    }
  
    this.jobSeekerService.updateProfile(this.profile.id, this.profile).subscribe({
      next: (updatedUser) => {
        console.log("Profile updated successfully", updatedUser);
        alert("Profile updated successfully!");
      },
      error: (error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Make sure you're logged in.");
      }
    });
  }
  
}
