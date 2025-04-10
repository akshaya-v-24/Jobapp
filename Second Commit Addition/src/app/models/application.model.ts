

// export interface Application {
//   id: number;
//   jobId: number;
//   jobTitle: string;
//   applicantId: number;
//   applicantName: string;
//   status: string;
//   resumeUrl?: string; // optional, if available
// }
// import { Job } from './job.model';

import { Job } from "./job.model";

// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// export interface Application {
//   id: number;
//   job: Job;
//   jobSeeker: User; // ✅ matches backend entity
//   resume: string;
//   coverLetter: string;
//   status: string;
// }

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Application {
showCover: any;
showResume: any;
  id: number;
  job: Job;
  jobSeeker: User;   // ✅ ensure this is jobSeeker not "applicant"
  resume: string;
  coverLetter: string;
  status: string;
}

