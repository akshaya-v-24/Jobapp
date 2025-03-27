// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-application-form',
//   imports: [],
//   templateUrl: './application-form.component.html',
//   styleUrl: './application-form.component.css'
// })
// export class ApplicationFormComponent {

// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Application } from '../../models/application.model';
import { ApplicationService } from '../../services/application.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//import { ApplicationService } from 'src/app/services/application.service';
//import { Application } from 'src/app/models/application.model';

@Component({
  selector: 'app-application-form',
  imports:[FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  applicationForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private applicationService: ApplicationService) {
    this.applicationForm = this.fb.group({
      jobId: ['', Validators.required],
      jobSeekerId: ['', Validators.required],
      resume: ['', Validators.required],
      coverLetter: ['', Validators.required]
    });
  }

  submitApplication() {
    if (this.applicationForm.valid) {
      const application: Application = this.applicationForm.value;
      application.status = 'PENDING';

      this.applicationService.applyForJob(application).subscribe(
        (response) => {
          this.successMessage = 'Application submitted successfully!';
          this.applicationForm.reset();
        },
        (error) => {
          console.error('Error applying for job:', error);
        }
      );
    }
  }
}
