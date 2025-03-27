import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role !== 'JOB_SEEKER') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
