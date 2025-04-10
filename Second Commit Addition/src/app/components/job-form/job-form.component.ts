


import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../models/job.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-job-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})

export class JobFormComponent implements OnInit {
  @Input() job: Job = {
    title: '',
    description: '',
    location: '',
    salary: 0,
    company: '',
    jobType: '',
    employer: { id: 0 },
  };

  @Output() saveJob = new EventEmitter<Job>();
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: [this.job.title],
      description: [this.job.description],
      location: [this.job.location],
      salary: [this.job.salary],
      company: [this.job.company],
      jobType: [this.job.jobType],
    });
  }

  onSubmit() {
    const updatedJob: Job = {
      ...this.job,
      ...this.jobForm.value,
    };
    this.saveJob.emit(updatedJob);
  }
}
