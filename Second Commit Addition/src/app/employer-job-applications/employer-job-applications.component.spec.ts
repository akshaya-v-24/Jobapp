import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobApplicationsComponent } from './employer-job-applications.component';

describe('EmployerJobApplicationsComponent', () => {
  let component: EmployerJobApplicationsComponent;
  let fixture: ComponentFixture<EmployerJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerJobApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
