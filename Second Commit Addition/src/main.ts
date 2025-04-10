// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// //import { AppComponent } from './app.component';
// import { provideRouter } from '@angular/router';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes';
// //import { routes } from './app.routes';

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)]
// });


// import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
// import { provideRouter, RouterModule } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { AppComponent } from './app/app.component';
// import { routes } from './app/app.routes'; // Your routes configuration file

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes), provideHttpClient(),BrowserModule],
// }).catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
