import axios from "axios";

const jobURL: string = "https://jobs-api-production-8127.up.railway.app/v1/";

export type CreateJobReq = {
  jobTitle: string;
  jobType: number;
  jobPrimaryTag: number;
  jobLocation: string;
  jobDescription: string;
  jobMinSalary: number;
  jobMaxSalary: number;
  jobCompanyName: string;
  jobCompanyLogoURL: string;
};

export type JobModel = {
  jobTitle: string;
  jobType: number;
  jobPrimaryTag: number;
  jobLocation: string;
  jobDescription: string;
  jobMinSalary: number;
  jobMaxSalary: number;
  jobCompanyName: string;
  jobCompanyLogoURL: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function PostJob(job: CreateJobReq) {
  await axios
    .post(jobURL + "jobs", {
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      jobPrimaryTag: job.jobPrimaryTag,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      jobMinSalary: job.jobMinSalary,
      jobMaxSalary: job.jobMaxSalary,
      jobCompanyName: job.jobCompanyName,
      jobCompanyLogoURL: job.jobCompanyLogoURL,
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
}

export async function GetAllJobs() {
  const response = await axios.get(jobURL + "jobs");

  return response.data;
}
