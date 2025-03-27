

// // import { Routes } from '@angular/router';
// // import { LoginComponent } from './auth/login/login.component';
// // import { RegisterComponent } from './auth/register/register.component';

// // export const routes: Routes = [
// //   { path: 'login', component: LoginComponent },
// //   { path: 'register', component: RegisterComponent },
// //   { path: 'jobs', loadComponent: () => import('./jobs/job-list/job-list.component').then(m => m.JobListComponent) },
// //   { path: 'job/:id', loadComponent: () => import('./jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent) }, // ✅ Ensure this exists
// //   { path: 'apply', loadComponent: () => import('./components/application-form/application-form.component').then(m => m.ApplicationFormComponent) }, // ✅ Ensure this exists
// //   { path: 'applications', loadComponent: () => import('./components/application-list/application-list.component').then(m => m.ApplicationListComponent) }, // ✅ Ensure this exists
// //   { path: 'job-seeker-dashboard', loadComponent: () => import('./components/job-seeker-dashboard/job-seeker-dashboard.component').then(m => m.JobSeekerDashboardComponent) },
// //   { path: 'employer-dashboard', loadComponent: () => import('./components/employer-dashboard/employer-dashboard.component').then(m => m.EmployerDashboardComponent) },
// //   { path: '', redirectTo: '/jobs', pathMatch: 'full' },
// //   { path: '**', redirectTo: '/jobs', pathMatch: 'full' } 
// // ];


// import { Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
// import { JobListComponent } from './jobs/job-list/job-list.component';
// import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
// import { JobSeekerDashboardComponent } from './job-seeker/job-seeker-dashboard.component';
// import { EmployerDashboardComponent } from './employer/employer-dashboard.component';
// import { ApplyComponent } from './jobs/apply/apply.component';
// import { ApplicationListComponent } from './jobs/application-list/application-list.component';
// import { AuthGuard } from './guards/auth.guard';
// import { EmployerGuard } from './guards/employer.guard';
// import { JobSeekerGuard } from './guards/job-seeker.guard';

// export const routes: Routes = [
//   // Authentication Routes
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   // Job Listings & Details (Accessible to all)
//   { path: 'jobs', component: JobListComponent },
//   { path: 'job/:id', component: JobDetailComponent }, // Dynamic Route for Job Details

//   // Job Seeker Routes (Protected)
//   { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent, canActivate: [AuthGuard, JobSeekerGuard] },
//   { path: 'apply/:id', component: ApplyComponent, canActivate: [AuthGuard, JobSeekerGuard] },
//   { path: 'applications', component: ApplicationListComponent, canActivate: [AuthGuard, JobSeekerGuard] },

//   // Employer Routes (Protected)
//   { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard, EmployerGuard] },

//   // Default Route
//   { path: '', redirectTo: '/jobs', pathMatch: 'full' },
//   { path: '**', redirectTo: '/jobs', pathMatch: 'full' } // Catch-all
// ];




import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
// import { JobSeekerDashboardComponent } from './job-seeker/job-seeker-dashboard.component';
// import { EmployerDashboardComponent } from './employer/employer-dashboard.component';
// import { ApplyComponent } from './jobs/apply/apply.component';
// import { ApplicationListComponent } from './jobs/application-list/application-list.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployerGuard } from './guards/employer.guard';
import { JobSeekerGuard } from './guards/job-seeker.guard';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
import { JobSeekerDashboardComponent } from './components/job-seeker-dashboard/job-seeker-dashboard.component';

export const routes: Routes = [
  // Authentication Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Job Listings & Details (Accessible to all)
  { path: 'jobs', component: JobListComponent },
  { path: 'job/:id', component: JobDetailComponent }, // Dynamic Route for Job Details

  // Job Seeker Routes (Protected)
  { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent, canActivate: [AuthGuard, JobSeekerGuard] },
  { path: 'apply/:id', component: JobListComponent, canActivate: [AuthGuard, JobSeekerGuard] },
  { path: 'applications', component: ApplicationListComponent, canActivate: [AuthGuard, JobSeekerGuard] },

  // Employer Routes (Protected)
  { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard, EmployerGuard] },

  // Default Route
  { path: '', redirectTo: '/jobs', pathMatch: 'full' },
  { path: '**', redirectTo: '/jobs', pathMatch: 'full' } // Catch-all
];
