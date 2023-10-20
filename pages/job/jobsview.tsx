import { GetAllJobs, JobModel } from "@api/job";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
import HorizontalJobview from "@components/job/horizontaljobcard";
import { useCallback, useEffect, useState } from "react";

export default function JobsView() {
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const fetchJobsData = useCallback(async () => {
    const data = await GetAllJobs();
    setJobs(data.data);
  }, []);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  return (
    <Container>
      {jobs ? (
        jobs.map((job, index) => {
          return <HorizontalJobview job={job} key={index} />;
        })
      ) : (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
    </Container>
  );
}
