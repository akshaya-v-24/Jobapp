// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-charts',
//   imports: [],
//   templateUrl: './admin-charts.component.html',
//   styleUrl: './admin-charts.component.css'
// })
// export class AdminChartsComponent {

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-admin-charts',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgChartsModule],
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit {
  users: any[] = [];
  applications: any[] = [];
  userRoleData: any = { labels: [], data: [] };
  activeStatusData: any = { active: 0, inactive: 0 };
  applicationsPerJob: any = { labels: [], data: [] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchApplications();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe({
      next: data => {
        this.users = data;
        this.prepareUserRoleChart();
        this.prepareActiveStatusChart();
      },
      error: err => console.error('Failed to load users:', err)
    });
  }

  fetchApplications() {
    this.http.get<any[]>('http://localhost:8080/api/admin/applications').subscribe({
      next: data => {
        this.applications = data;
        this.prepareApplicationsChart();
      },
      error: err => console.error('Failed to load applications:', err)
    });
  }

  prepareUserRoleChart() {
    const roleCounts: { [key: string]: number } = {};
    this.users.forEach(user => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });
    this.userRoleData = {
      labels: Object.keys(roleCounts),
      data: Object.values(roleCounts)
    };
  }

  prepareActiveStatusChart() {
    let active = 0, inactive = 0;
    this.users.forEach(user => {
      user.active ? active++ : inactive++;
    });
    this.activeStatusData = { active, inactive };
  }

  prepareApplicationsChart() {
    const jobAppCount: { [key: string]: number } = {};
    this.applications.forEach(app => {
      const jobTitle = app.job?.title || 'Unknown Job';
      jobAppCount[jobTitle] = (jobAppCount[jobTitle] || 0) + 1;
    });
    this.applicationsPerJob = {
      labels: Object.keys(jobAppCount),
      data: Object.values(jobAppCount)
    };
  }
}
