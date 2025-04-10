
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from "../job-form/job-form.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { Job } from 'src/app/models/job.model';
//import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-employer-dashboard',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, JobFormComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {
  jobs: Job[] = [];
  showForm: boolean = false;
  editingJob?: Job;

  // Get from auth or token
  employerId: number = 21;

  constructor(private jobService: JobService,private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  viewApplicants(): void {
    const employerId = this.authService.getEmployerId();
    console.log('🔍 Checking stored employerId before navigation:', employerId);

    if (employerId) {
      this.router.navigate(['/applicants']);
    } else {
      console.error('❌ No employer ID found. Please log in again.');
    }
  }
  

  loadJobs() {
    this.jobService.getJobsByEmployer(this.employerId).subscribe((data) => {
      this.jobs = data;
    });
  }

  openCreateForm() {
    this.editingJob = {
      title: '',
      description: '',
      location: '',
      salary: 0,
      company: '',
      jobType: '',
      employer: { id: this.employerId },
    };
    this.showForm = true;
  }

  openEditForm(job: Job) {
    this.editingJob = { ...job };
    this.showForm = true;
  }

  onSaveJob(job: Job) {
    if (job.id) {
      this.jobService.updateJob(job.id, job).subscribe(() => {
        this.loadJobs();
        this.showForm = false;
      });
    } else {
      this.jobService.createJob(job).subscribe(() => {
        this.loadJobs();
        this.showForm = false;
      });
    }
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => {
      this.loadJobs();
    });
  }
}

