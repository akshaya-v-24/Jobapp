
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  jobs: any[] = [];
  searchQuery: string = '';
  sortAscending: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchJobs();
  }

  
  fetchUsers() {
    this.http.get<any[]>('http://localhost:8080/api/admin/users').subscribe({
      next: data => {
        this.users = data;
        this.applySearchFilter();
      },
      error: err => console.error('Failed to load users:', err)
    });
  }

  fetchJobs() {
    this.http.get<any[]>('http://localhost:8080/api/admin/jobs').subscribe({
      next: data => this.jobs = data,
      error: err => console.error('Failed to load jobs:', err)
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:8080/api/admin/users/${id}`).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.fetchUsers();
        },
        error: err => {
          console.error('Delete user failed:', err);
          alert('Error deleting user. Check backend logs.');
        }
      });
    }
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`http://localhost:8080/api/admin/jobs/${id}`).subscribe({
        next: () => {
          alert('Job deleted successfully');
          this.fetchJobs();
        },
        error: err => {
          console.error('Delete job failed:', err);
          alert('Error deleting job. Check backend logs.');
        }
      });
    }
  }

  toggleActive(user: any) {
    const newStatus = !user.active;
    this.http.put(`http://localhost:8080/api/admin/users/${user.id}/status`, { active: newStatus }).subscribe({
      next: () => {
        alert('User status updated');
        this.fetchUsers();
      },
      error: err => {
        console.error('Toggle active status failed:', err);
        alert('Failed to update user status.');
      }
    });
  }

  applySearchFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => user.email.toLowerCase().includes(query));
  }

  toggleSortByRole() {
    this.sortAscending = !this.sortAscending;
    this.filteredUsers.sort((a, b) => {
      if (a.role < b.role) return this.sortAscending ? -1 : 1;
      if (a.role > b.role) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }
}


