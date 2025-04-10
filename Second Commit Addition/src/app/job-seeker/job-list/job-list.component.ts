



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSeekerService } from '../../services/job-seeker.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobApplicationComponent } from '../../jobs/job-application/job-application.component';
//import { JobApplicationComponent } from '../job-application/job-application.component'; // ✅ Import the component

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobApplicationComponent], // ✅ Add here
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchQuery: string = '';
  jobTypeFilter: string = '';
  locationFilter: string = '';
  uniqueLocations: string[] = [];
  showApplicationForm: boolean = false;
  selectedJobId: number | null = null;

  constructor(
    private jobSeekerService: JobSeekerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.jobSeekerService.getJobs().subscribe((data) => {
      this.jobs = data;
      this.filteredJobs = data;
      this.extractUniqueLocations();
    });
  }

  extractUniqueLocations(): void {
    this.uniqueLocations = [...new Set(this.jobs.map(job => job.location))]; // Get unique locations
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.jobTypeFilter === '' || job.jobType === this.jobTypeFilter) &&
      (this.locationFilter === '' || job.location === this.locationFilter)
    );
  }

  // apply(jobId: number) {
  //   console.log('Navigating to Apply Page with jobId:', jobId); // ✅ Debugging Log
  //   this.router.navigate(['/apply', jobId]); // ✅ Correct Navigation
  // }

  apply(jobId: number) {
    this.jobSeekerService.applyForJob(jobId).subscribe({
      next: (res) => {
        alert('Application submitted successfully!'); // ✅ Feedback
      },
      error: (err) => {
        console.error('Application failed:', err);
        alert('Failed to apply for job');
      }
    });
  }
  

  openApplicationForm(jobId?: number): void {
    if (jobId !== undefined) {
      this.selectedJobId = jobId;
      this.showApplicationForm = true;
    }
  }

  closeApplicationForm(): void {
    this.showApplicationForm = false;
    this.selectedJobId = null;
  }
}
