import React, { useEffect, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  CircularProgress,
  position,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  LoadingIndicatorProps,
  Select,
  chakraComponents,
  useChakraSelectProps,
  ActionMeta,
} from "chakra-react-select";
import axios from "axios";
import {
  ConvertJobTypeToNum,
  ConvertPrimaryTagToNum,
} from "../../../utils/job";

// These are the defaults for each of the custom props
const asyncComponents = {
  LoadingIndicator: (props: LoadingIndicatorProps) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor="transparent"
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize="md"
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed="0.45s"
      // A CSS size string representing the thickness of the spinner's line
      thickness="2px"
      // Don't forget to forward the props!
      {...props}
    />
  ),
};

interface Option {
  value: string;
  label: string;
}

const jobTypeOptions: Option[] = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contractor", label: "Contractor" },
  { value: "Internship", label: "Internship" },
];

const tagOptions: Option[] = [
  { value: "Backend", label: "Backend" },
  { value: "Frontend", label: "Frontend" },
  { value: "Mobile", label: "Mobile" },
  { value: "IOS", label: "IOS" },
  { value: "DevOps", label: "DevOps" },
];

const jobLocationOptions: Option[] = [
  { value: "Worldwide", label: "Worldwide" },
  { value: "Indonesia", label: "Indonesia" },
];

async function postJob(
  jobTitle: string,
  position: string,
  jobType: number,
  primaryTag: number,
  jobLocation: string | undefined,
  jobDescription: string,
  minSalary: number | null,
  maxSalary: number | null,
  companyName: string
) {
  axios
    .post("http://localhost:8888/v1/add-doc", {
      jobTitle: jobTitle,
      position: position,
      jobType: jobType,
      jobPrimaryTag: primaryTag,
      jobLocation: jobLocation,
      jobDescription: jobDescription,
      jobMinSalary: minSalary,
      jobMaxSalary: maxSalary,
      jobCompanyName: companyName,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [jobTitle, setJobTitle] = useState("");
  const [position, setPosition] = useState("");
  const [jobType, setJobType] = useState<Option | null>(null);
  const [primaryTag, setPrimaryTag] = useState<Option | null>(null);
  const [jobLocation, setJobLocation] = useState<Option | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [minSalary, setMinSalary] = useState<number | null>(null);
  const [maxSalary, setMaxSalary] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log("jobType: ", jobType?.value);
    console.log("jobTitle: ", jobTitle);
    console.log("position: ", position);
    console.log("primaryTag: ", primaryTag);
    console.log("jobLocation: ", jobLocation);
    console.log("jobDescription: ", jobDescription);
    console.log("minSalary: ", minSalary);
    console.log("maxSalary: ", maxSalary);
    console.log("companyName: ", companyName);

    var jobTypeNum: number = ConvertJobTypeToNum(jobType?.value);
    var primaryTagNum: number = ConvertPrimaryTagToNum(primaryTag?.value);

    try {
      await postJob(
        jobTitle,
        position,
        jobTypeNum,
        primaryTagNum,
        jobLocation?.value,
        jobDescription,
        minSalary,
        maxSalary,
        companyName
      );
      // await postJob({ jobTitle, position, jobType?.value, primaryTag?.value, jobLocation?.value, jobDescription, minSalary, maxSalary, companyName });
      setIsLoading(false);
    } catch (error) {
      setError("invalid job title or job type");
      // sanitizeJobPostFields();
    }
  };

  // const withEvent(func: Function): React.ChangeEventHandler<any> {
  //   return (event:React.ChangeEvent<any>) => {
  //     const{currentTarget} = event;
  //     func(currentTarget.value);
  //   }
  // }

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Job Details
      </Heading>
      <FormControl id="jobTitle" isRequired>
        <FormLabel htmlFor="jobTitle">Job Title</FormLabel>
        <Input
          id="jobTitle"
          placeholder="Job Title"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setJobTitle(event.currentTarget.value);
          }}
        />
      </FormControl>

      <FormControl id="jobType" mt="2%" isRequired>
        <FormLabel htmlFor="jobType">Job Type</FormLabel>
        <Select
          name="jobType"
          placeholder="Job Type"
          options={jobTypeOptions}
          onChange={(newValue: Option | null) => {
            setJobType(newValue);
          }}
          id="jobType"
          inputId="jobType"
          instanceId={"jobTypeInstance"}
        />
      </FormControl>

      <FormControl id="position" mt="2%" isRequired>
        <FormLabel htmlFor="position">Position</FormLabel>
        <Input
          id="position"
          placeholder="Position"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setPosition(event.currentTarget.value);
          }}
        />
      </FormControl>

      <FormControl id="primaryTag" mt="2%" isRequired>
        <FormLabel htmlFor="primaryTag">Primary Tag</FormLabel>
        <Select
          name="primaryTag"
          placeholder="Primary Tag"
          options={tagOptions}
          id="primaryTag"
          inputId="primaryTag"
          instanceId={"primaryTagInstance"}
          onChange={(newValue: Option | null) => {
            setPrimaryTag(newValue);
          }}
        />
      </FormControl>

      <FormControl id="jobLocation" mt="2%" isRequired>
        <FormLabel htmlFor="jobLocation">Job Location</FormLabel>
        <Select
          id="jobLocation"
          inputId="jobLocation"
          instanceId={"jobLocationInstance"}
          name="jobLocation"
          placeholder="Job Location"
          options={jobLocationOptions}
          onChange={(newValue: Option | null) => {
            setJobLocation(newValue);
          }}
        />
      </FormControl>

      <FormControl id="jobDescription" mt={1} isRequired>
        <FormLabel htmlFor="jobDescription">Job Description</FormLabel>
        <Textarea
          id="jobDescription"
          placeholder="Brief description about the job"
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{
            sm: "sm",
          }}
          onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
            setJobDescription(event.currentTarget.value);
          }}
        />
      </FormControl>

      <FormControl id="salaryRange" mt="2%" isRequired>
        <FormLabel htmlFor="salaryRange">Salary Range</FormLabel>
        <Flex>
          <Input
            id="minSalary"
            name="minSalary"
            placeholder="Min Annual Salary"
            type="number"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setMinSalary(event.currentTarget.valueAsNumber);
            }}
          />
          <Input
            id="maxSalary"
            name="maxSalary"
            placeholder="Max Annual Salary"
            type="number"
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setMaxSalary(event.currentTarget.valueAsNumber);
            }}
          />
        </Flex>
      </FormControl>

      <FormControl id="companyName" mt="2%" isRequired>
        <FormLabel htmlFor="companyName">Company Name</FormLabel>
        <Input
          id="companyName"
          placeholder="Company Name"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setCompanyName(event.currentTarget.value);
          }}
        />
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-evenly">
          <Button
            w="7rem"
            colorScheme="teal"
            variant="solid"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Submit"
            )}
          </Button>
        </Flex>
      </ButtonGroup>
    </>
  );
};

export default function JobPostForm() {
  const toast = useToast();
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        {<Form1 />}
      </Box>
    </>
  );
}
