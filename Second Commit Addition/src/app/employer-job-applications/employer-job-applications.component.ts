// import { Component, OnInit } from '@angular/core';
// import { Application } from '../models/application.model';
// import { Job } from '../models/job.model';
// import { AuthService } from '../services/auth.service';
// import { JobService } from '../services/job.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ApplicationService } from '../services/application.service';

// @Component({
//   selector: 'app-employer-job-applications',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './employer-job-applications.component.html',
//   styleUrls: ['./employer-job-applications.component.css']
// })
// export class EmployerJobApplicationsComponent implements OnInit {
//   jobs: Job[] = [];
//   selectedJobId: number | null = null;
//   applications: Application[] = [];

//   constructor(
//     private jobService: JobService,
//     private authService: AuthService,
//     private applicationService: ApplicationService
//   ) {}

//   ngOnInit(): void {
//     const employerId = this.authService.getUserId();
//     if (employerId) {
//       this.jobService.getJobsByEmployer(employerId).subscribe({
//         next: (data) => {
//           this.jobs = data;
//         },
//         error: (err) => console.error('Error fetching jobs:', err)
//       });
//     }
//   }

//   onSelectJob(jobId: number): void {
//     this.selectedJobId = jobId;
//     this.applications = []; // Clear previous applications

//     this.jobService.getApplicantsByJobId(jobId).subscribe({
//       next: (data) => {
//         this.applications = data;
//         console.log('Fetched applications:', this.applications);
//       },
//       error: (err) => console.error('Error fetching applications:', err)
//     });
//   }

//   // approveApplication(app: Application): void {
//   //   app.status = 'ACCEPTED';
//   //   // Call backend to update status if needed
//   // }

//   // rejectApplication(app: Application): void {
//   //   app.status = 'REJECTED';
//   //   // Call backend to update status if needed
//   // }

//   approveApplication(app: Application): void {
//     // this.applicationService.updateApplicationStatus(app.id, 'ACCEPTED').subscribe({
//     //   next: () => {
//     //     app.status = 'ACCEPTED';
//     //     console.log('Application approved');
//     //   },
//     //   error: (err) => console.error('Error approving application:', err)
//     // });
//     this.applicationService.updateApplicationStatus(applicationId, 'ACCEPTED').subscribe({
//       next: (res) => {
//         console.log("✅ Application status updated", res);
//       },
//       error: (err) => {
//         console.error("❌ Error approving application:", err);
//       }
//     });
    
//   }
  
//   rejectApplication(app: Application): void {
//     this.applicationService.updateApplicationStatus(app.id, 'REJECTED').subscribe({
//       next: () => {
//         app.status = 'REJECTED';
//         console.log('Application rejected');
//       },
//       error: (err) => console.error('Error rejecting application:', err)
//     });
//   }
  
// }


import { Component, OnInit } from '@angular/core';
import { Application } from '../models/application.model';
import { Job } from '../models/job.model';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-employer-job-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employer-job-applications.component.html',
  styleUrls: ['./employer-job-applications.component.css']
})
export class EmployerJobApplicationsComponent implements OnInit {
  jobs: Job[] = [];
  selectedJobId: number | null = null;
  applications: Application[] = [];

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    const employerId = this.authService.getUserId();
    if (employerId) {
      this.jobService.getJobsByEmployer(employerId).subscribe({
        next: (data) => (this.jobs = data),
        error: (err) => console.error('Error fetching jobs:', err)
      });
    }
  }

  onSelectJob(jobId: number): void {
    this.selectedJobId = jobId;
    this.applications = [];

    this.jobService.getApplicantsByJobId(jobId).subscribe({
      next: (data) => {
        this.applications = data;
        console.log('Fetched applications:', this.applications);
      },
      error: (err) => console.error('Error fetching applications:', err)
    });
  }



  // approveApplication(app: Application): void {
  //   this.applicationService.updateApplicationStatus(app.id, 'ACCEPTED').subscribe({
  //     next: (res: any) => {
  //       app.status = 'ACCEPTED';
  //       console.log("✅", res); // Just a string now
  //     },
  //     error: (err) => {
  //       console.error("❌ Error approving application:", err.error || err.message);
  //     }
  //   });
  // }
  

 

  // rejectApplication(app: Application): void {
  //   this.applicationService.updateApplicationStatus(app.id, 'REJECTED').subscribe({
  //     next: (res: any) => {
  //       app.status = 'REJECTED';
  //       console.log("❌", res); // This will log: Application status updated to REJECTED
  //     },
  //     error: (err) => {
  //       console.error("❌ Error rejecting application:", err.error || err.message);
  //     }
  //   });
  // }

  approveApplication(app: Application): void {
    this.applicationService.updateApplicationStatus(app.id, 'ACCEPTED').subscribe({
      next: (res: any) => {
        app.status = 'ACCEPTED';
        console.log("✅ Application approved:", res);
      },
      error: (err) => {
        console.error("❌ Error approving application:", err.error || err.message);
      }
    });
  }
  
  rejectApplication(app: Application): void {
    this.applicationService.updateApplicationStatus(app.id, 'REJECTED').subscribe({
      next: (res: any) => {
        app.status = 'REJECTED';
        console.log("❌ Application rejected:", res);
      },
      error: (err) => {
        console.error("❌ Error rejecting application:", err.error || err.message);
      }
    });
  }
  
  
}
