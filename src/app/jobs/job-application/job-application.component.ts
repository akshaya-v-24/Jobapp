// import { Component, Input } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

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
//       console.error('Error: Job ID is missing');
//       alert('Job ID is missing. Please try again.');
//       return;
//     }

//     const token = this.authService.getToken(); // Get JWT token
//     const jobSeekerId = this.authService.getUserId(); // Get logged-in user ID

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
//       jobSeekerId: jobSeekerId, // Ensure this is included
//       resume: this.applicationData.resume,
//       coverLetter: this.applicationData.coverLetter
//     };

//     this.http.post('http://localhost:8080/applications', applicationPayload, { headers })
//       .subscribe(
//         response => {
//           console.log('Application submitted successfully', response);
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


import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent {
  @Input() jobId?: number; // Job ID received from job-list component

  applicationData = {
    resume: '',
    coverLetter: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  submitApplication() {
    if (!this.jobId) {
      alert('Job ID is missing. Please try again.');
      return;
    }

    const token = this.authService.getToken();
    const jobSeekerId = this.authService.getUserId(); // Fetch the stored user ID

    if (!jobSeekerId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const applicationPayload = {
      jobId: this.jobId,
      jobSeekerId: jobSeekerId,
      resume: this.applicationData.resume,
      coverLetter: this.applicationData.coverLetter
    };

    this.http.post('http://localhost:8080/applications', applicationPayload, { headers })
      .subscribe(
        response => {
          alert('Application submitted successfully!');
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting application:', error.message);
          if (error.status === 403) {
            alert('You are not authorized. Please log in again.');
          } else {
            alert('Failed to submit application. Please try again.');
          }
        }
      );
  }
}
