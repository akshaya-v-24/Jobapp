// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "./navbar/navbar.component";

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, NavbarComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'job-board';
// }


import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isJobSeeker(): boolean {
    return this.authService.getUserRole() === 'jobseeker';
  }

  isEmployer(): boolean {
    return this.authService.getUserRole() === 'employer';
  }

  logout(): void {
    this.authService.logout();
  }
}
