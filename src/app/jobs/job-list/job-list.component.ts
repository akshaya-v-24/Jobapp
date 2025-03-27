import { Component, OnInit } from '@angular/core';
//import { JobService } from '../services/job.service';  // Adjust path if necessary
//import { Job } from '../models/job.model'; // Define an appropriate Job model
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { JobApplicationComponent } from "../job-application/job-application.component";

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [FormsModule, CommonModule, JobApplicationComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchQuery: string = '';
  jobTypeFilter: string = '';
  locationFilter: string = '';
  uniqueLocations: string[] = [];
  showApplicationForm: boolean = false;
  selectedJobId: number | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe((data: Job[]) => {
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

  // openApplicationForm(jobId: number): void {
  //   this.selectedJobId = jobId;
  //   this.showApplicationForm = true;
  // }

  closeApplicationForm(): void {
    this.showApplicationForm = false;
    this.selectedJobId = null;
  }

  openApplicationForm(jobId?: number): void {
    if (jobId !== undefined) {
      this.selectedJobId = jobId;
      this.showApplicationForm = true;
    }
  }
  
}
