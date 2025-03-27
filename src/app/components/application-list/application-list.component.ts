// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-application-list',
// //   imports: [],
// //   templateUrl: './application-list.component.html',
// //   styleUrl: './application-list.component.css'
// // })
// // export class ApplicationListComponent {

// // }


// import { Component, OnInit } from '@angular/core';
// import { Application } from '../../models/application.model';
// import { ApplicationService } from '../../services/application.service';
// import { CommonModule } from '@angular/common';

// // import { ApplicationService } from 'src/app/services/application.service';
// // import { Application } from 'src/app/models/application.model';

// @Component({
//   selector: 'app-application-list',
//   imports: [CommonModule],
//   templateUrl: './application-list.component.html',
//   styleUrls: ['./application-list.component.css']
// })
// export class ApplicationListComponent implements OnInit {
//   applications: Application[] = [];

//   constructor(private applicationService: ApplicationService) {}

//   ngOnInit(): void {
//     this.fetchApplications();
//   }

//   fetchApplications() {
//     this.applicationService.getAllApplications().subscribe(
//       (data) => {
//         this.applications = data;
//       },
//       (error) => {
//         console.error('Error fetching applications:', error);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.applicationService.getAllApplications().subscribe(
      (data) => {
        this.applications = data;
      },
      (error) => {
        console.error('Error fetching applications:', error);
      }
    );
  }
}
