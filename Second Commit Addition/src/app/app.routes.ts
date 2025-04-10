

// import { Routes } from '@angular/router';
// //import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
// import { JobSeekerDashboardComponent } from './components/job-seeker-dashboard/job-seeker-dashboard.component';
// import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
// import { ApplicationListComponent } from './components/application-list/application-list.component';
// import { JobApplicationComponent } from './jobs/job-application/job-application.component'; 

// import { AuthGuard } from './guards/auth.guard';
// import { EmployerGuard } from './guards/employer.guard';
// import { JobSeekerGuard } from './guards/job-seeker.guard';
// import { HomeComponent } from './home/home.component';

// export const routes: Routes = [
//   // Home Page (Only Login/Register/Logout)
//   { path: '', component: HomeComponent }, 

//   // Authentication Routes
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   // Job Seeker Routes (Protected)
//   { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent, canActivate: [AuthGuard, JobSeekerGuard] },
//   { path: 'apply/:id', component: JobApplicationComponent, canActivate: [AuthGuard, JobSeekerGuard] },
//   { path: 'applications', component: ApplicationListComponent, canActivate: [AuthGuard, JobSeekerGuard] },

//   // Employer Routes (Protected)
//   { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard, EmployerGuard] },

//   // Catch-all Route (Redirect to Home)
//   { path: '**', redirectTo: '', pathMatch: 'full' }
// ];


import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobSeekerDashboardComponent } from './components/job-seeker-dashboard/job-seeker-dashboard.component';
import { EmployerDashboardComponent } from './components/employer-dashboard/employer-dashboard.component';
//import { ApplicationListComponent } from './components/application-list/application-list.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';
import { HomeComponent } from './home/home.component';

// Job Seeker Components
import { ProfileComponent } from './job-seeker/profile/profile.component';
import { JobListComponent } from './job-seeker/job-list/job-list.component';
import { ApplicationStatusComponent } from './job-seeker/application-status/application-status.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { EmployerGuard } from './guards/employer.guard';
import { JobSeekerGuard } from './guards/job-seeker.guard';
//import { JobPostingsComponent } from './components/job-postings/job-postings.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { EmployerJobApplicationsComponent } from './employer-job-applications/employer-job-applications.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { AdminChartsComponent } from './admin/admin-charts/admin-charts.component';
//simport { EmployerNotificationsComponent } from './components/employer-notifications/employer-notifications.component';
//import { EmployerApplicationsComponent } from './components/employer-applications/employer-applications.component';
//import { ApplicationFormComponent } from './components/application-form/application-form.component';

export const routes: Routes = [
  // Home Page (Only Login/Register/Logout)
  { path: '', component: HomeComponent },

  // Authentication Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'application-form', component: ApplicationFormComponent},
  //{ path: 'application-list', component: ApplicationListComponent},

  // Job Seeker Dashboard & Nested Routes
  { path: 'job-seeker-dashboard', component: JobSeekerDashboardComponent, canActivate: [AuthGuard, JobSeekerGuard] },
 // { path: 'apply/:id', component: JobApplicationComponent, canActivate: [AuthGuard, JobSeekerGuard] },
  { path: 'apply/:jobId', component: JobApplicationComponent, canActivate: [AuthGuard, JobSeekerGuard] },

 // { path: 'applications', component: ApplicationListComponent, canActivate: [AuthGuard, JobSeekerGuard] },

  // New Job Seeker Routes
  { path: 'job-seeker/profile', component: ProfileComponent, canActivate: [AuthGuard, JobSeekerGuard] },
  { path: 'job-seeker/jobs', component: JobListComponent, canActivate: [AuthGuard, JobSeekerGuard] },
  { path: 'job-seeker/status', component: ApplicationStatusComponent, canActivate: [AuthGuard, JobSeekerGuard] },

  // Employer Routes (Protected)
  { path: 'employer-dashboard', component: EmployerDashboardComponent, canActivate: [AuthGuard, EmployerGuard] },
  { path: 'job-form', component: JobFormComponent },
  {
    path: 'employer/applications',
    component: EmployerJobApplicationsComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  { path: 'admin-charts', component: AdminChartsComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'employer-profile', component: EmployerProfileComponent },
  // {
  //   path: 'notifications',
  //   component: EmployerNotificationsComponent
  // },
  

  // Catch-all Route (Redirect to Home)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
