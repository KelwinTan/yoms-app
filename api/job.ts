import axios, { AxiosResponse } from "axios";

const jobURL: string = "http://localhost:8888/v1/";

export type JobModel = {
  jobTitle: string;
  jobType: number;
  jobPrimaryTag: number;
  jobLocation: string;
  jobDescription: string;
  minSalary: number;
  maxSalary: number;
  jobCompanyName: string;
  jobCompanyLogoURL: string;
};

export async function postJob(job: JobModel) {
  await axios
    .post(jobURL + "jobs", {
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      jobPrimaryTag: job.jobPrimaryTag,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      jobMinSalary: job.minSalary,
      jobMaxSalary: job.maxSalary,
      jobCompanyName: job.jobCompanyName,
      jobCompanyLogoURL: job.jobCompanyLogoURL,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function getAllJobs() {
  const response = await axios.get(jobURL + "jobs");
  // .then((resp: AxiosResponse<any, any>) => {
  //   console.log(resp.data);
  //   return resp.data;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  //   console.log("test");
  return response.data;
}
