
// import { Component, Input } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-job-application',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './job-application.component.html',
//   styleUrls: ['./job-application.component.css']
// })
// export class JobApplicationComponent {
//   @Input() jobId?: number; // Job ID received from job-list component

//   applicationData = {
//     resume: '',
//     coverLetter: ''
//   };

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   submitApplication() {
//     if (!this.jobId) {
//       alert('Job ID is missing. Please try again.');
//       return;
//     }

//     const token = this.authService.getToken();
//     const jobSeekerId = this.authService.getUserId(); // Fetch the stored user ID

//     if (!jobSeekerId) {
//       alert('User ID is missing. Please log in again.');
//       return;
//     }

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     });

//     const applicationPayload = {
//       jobId: this.jobId,
//       jobSeekerId: jobSeekerId,
//       resume: this.applicationData.resume,
//       coverLetter: this.applicationData.coverLetter
//     };

//     this.http.post('http://localhost:8080/applications', applicationPayload, { headers })
//       .subscribe(
//         response => {
//           alert('Application submitted successfully!');
//         },
//         (error: HttpErrorResponse) => {
//           console.error('Error submitting application:', error.message);
//           if (error.status === 403) {
//             alert('You are not authorized. Please log in again.');
//           } else {
//             alert('Failed to submit application. Please try again.');
//           }
//         }
//       );
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  //jobId!: number; // Store the extracted job ID
  @Input() jobId!: number;
  applicationData = {
    resume: '',
    coverLetter: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // ngOnInit() {
  //   // ✅ Extract Job ID from URL
  //   this.route.paramMap.subscribe(params => {
  //     const jobIdParam = params.get('jobId');
  //     console.log("Raw jobId from URL:", jobIdParam); // Debugging log

  //     this.jobId = jobIdParam ? Number(jobIdParam) : 0;

  //     if (isNaN(this.jobId) || this.jobId <= 0) {
  //       alert('Invalid Job ID. Please try again.');
  //       this.router.navigate(['/']); // Redirect to home
  //     } else {
  //       console.log("Extracted jobId:", this.jobId); // ✅ Debugging log
  //     }
  //   });
  // }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const jobIdParam = params.get('jobId');
      console.log("Raw jobId from URL:", jobIdParam); // ✅ Debugging Log

      this.jobId = jobIdParam ? Number(jobIdParam) : 0;

      if (isNaN(this.jobId) || this.jobId <= 0) {
        alert('Invalid Job ID. Please try again.');
        this.router.navigate(['/']); // Redirect to home if invalid
      } else {
        console.log("Extracted jobId:", this.jobId); // ✅ Debugging Log
      }
    });
  }

  submitApplication() {
    const token = this.authService.getToken();
    const jobSeekerId = this.authService.getUserId(); // ✅ Get logged-in user ID

    if (!this.jobId || !jobSeekerId) {
      alert('Job ID or User ID is missing. Please log in again.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const applicationPayload = {
      jobId: this.jobId,
      jobSeekerId: jobSeekerId,
      resume: this.applicationData.resume,
      coverLetter: this.applicationData.coverLetter
    };

    this.http.post('http://localhost:8080/applications', applicationPayload, { headers })
      .subscribe(
        () => {
          alert('Application submitted successfully!');
          this.router.navigate(['/']); // ✅ Redirect to job list
        },
        error => {
          console.error('Error submitting application:', error);
          alert('Failed to submit application. Please try again.');
        }
      );
  }
}
