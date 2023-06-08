import { useCallback, useEffect, useState } from "react";
import { JobModel, getAllJobs } from "../../../api/job";
import JobCard from "./jobcard";

export default function JobsView() {
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const fetchJobsData = useCallback(async () => {
    const data = await getAllJobs();
    console.log("data: ", data.data);
    setJobs(data.data);
  }, []);

  useEffect(() => {
    fetchJobsData();
    console.log("useeffect: ", jobs);
  }, [fetchJobsData, jobs]);

  return (
    <div>
      {jobs.map((job, index) => {
        return <JobCard job={job} key={index} />;
      })}
    </div>
  );
}
