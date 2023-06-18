import { JobModel, getAllJobs } from "@api/job";
import { Container } from "@chakra-ui/react";
import HorizontalJobview from "@components/job/horizontaljobcard";
import { useCallback, useEffect, useState } from "react";

export default function JobsView() {
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const fetchJobsData = useCallback(async () => {
    const data = await getAllJobs();
    console.log("data: ", data.data);
    setJobs(data.data);
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  return (
    <Container>
      {jobs.map((job, index) => {
        return <HorizontalJobview job={job} key={index} />;
      })}
    </Container>
  );
}
