// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobSeekerGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const role = localStorage.getItem('role');
//     if (role !== 'JOB_SEEKER') {
//       this.router.navigate(['/']);
//       return false;
//     }
//     return true;
//   }
// }


import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class JobSeekerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole();
    console.log('JobSeekerGuard - Role:', role);

    if (role !== 'JOB_SEEKER') {
      console.warn('JobSeekerGuard - Not a job seeker, redirecting to home.');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
