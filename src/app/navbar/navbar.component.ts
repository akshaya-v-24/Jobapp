// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   imports:[CommonModule],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   constructor(private router: Router) {}

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   isJobSeeker(): boolean {
//     return localStorage.getItem('role') === 'JOB_SEEKER';
//   }

//   isEmployer(): boolean {
//     return localStorage.getItem('role') === 'EMPLOYER';
//   }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Add RouterModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isJobSeeker(): boolean {
    return localStorage.getItem('role') === 'JOB_SEEKER';
  }

  isEmployer(): boolean {
    return localStorage.getItem('role') === 'EMPLOYER';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
