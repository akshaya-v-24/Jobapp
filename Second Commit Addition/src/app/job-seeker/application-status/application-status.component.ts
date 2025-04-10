


import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from '../../services/job-seeker.service';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-application-status',
  imports: [CommonModule],
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent implements OnInit {
  applications: any[] = [];

  constructor(private jobSeekerService: JobSeekerService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.jobSeekerService.getApplicationStatus().subscribe((data) => {
      this.applications = data;
      console.log(this.applications);  // Inspect if `job` and `title` are correctly nested
    });
  }

  

  deleteApplication(applicationId: number) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No JWT token found');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.jobSeekerService.deleteApplication(applicationId, headers).subscribe(
      () => {
        this.applications = this.applications.filter(app => app.id !== applicationId);
        console.log('Application deleted successfully');
      },
      (error) => {
        console.error('Error deleting application:', error);
      }
    );
  }
  
}

