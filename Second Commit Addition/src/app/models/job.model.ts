// export interface Job {
//     id?: number;
//     title: string;
//     description: string;
//     company: string;
//     location: string;
//     jobType: string; // Full-time, Part-time, Contract
//     salary: number;
//   }
  
export interface Employer {
  id: number;
}

export interface Job {
  id?: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  company: string;
  jobType: string;
  employer: Employer;
}
