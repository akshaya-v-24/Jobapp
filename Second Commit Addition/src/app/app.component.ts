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


// import { Component } from '@angular/core';
// import { AuthService } from './services/auth.service';
// import { Router, RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   imports: [CommonModule,RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
  

//   constructor(private authService: AuthService, private router: Router) {}

//   isLoggedIn(): boolean {
//     return this.authService.isAuthenticated();
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/']); // Redirect to home after logout
//   }
// }


import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  // isNotHomePage(): boolean {
  //   return this.router.url !== '/';
  // }

  isNotHomePage(): boolean {
    return !['/', '/home'].includes(this.router.url);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to home after logout
  }
}
