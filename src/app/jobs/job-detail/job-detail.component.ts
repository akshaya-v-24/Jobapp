// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-job-detail',
//   imports: [],
//   templateUrl: './job-detail.component.html',
//   styleUrl: './job-detail.component.css'
// })
// export class JobDetailComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-job-detail',
    imports: [CommonModule],
    templateUrl: './job-detail.component.html',
    styleUrl: './job-detail.component.css'
  })

export class JobDetailComponent implements OnInit {
  jobId!: string;
  job: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id')!;
    this.fetchJobDetails();
  }

  fetchJobDetails() {
    this.http.get(`http://localhost:8080/jobs/${this.jobId}`).subscribe((data) => {
      this.job = data;
    });
  }
}
