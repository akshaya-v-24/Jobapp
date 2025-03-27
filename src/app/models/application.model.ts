// export interface Application {
//     id?: number;
//     jobId: number;
//     jobSeekerId: number;
//     resume: string;
//     coverLetter: string;
//     status?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
//   }
  
export interface Application {
    id: number;
    job: { id: number }; // Ensure Job contains an ID
    jobSeeker: { id: number }; // Ensure Job Seeker contains an ID
    resume: string;
    coverLetter: string;
    status: string;
  }
  