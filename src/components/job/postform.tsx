import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { CreateJobReq, PostJob } from "@api/job";
import { useToast } from "@chakra-ui/react";
import { ConvertJobTypeToNum, ConvertPrimaryTagToNum } from "@utils/job";
import {
  LoadingIndicatorProps,
  Select,
  chakraComponents,
} from "chakra-react-select";
import { useRouter } from "next/router";
// import Editor from "../form/editorcontainter";
import MarkdownEditor from "@components/md/markdown";
import PaypalPayment from "@components/payments/paypal";
import ThreeTierPricing from "@components/pricing/TierPricing";
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

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [jobTitle, setJobTitle] = useState("");
  // const [position, setPosition] = useState("");
  const [jobType, setJobType] = useState<Option | null>(null);
  const [primaryTag, setPrimaryTag] = useState<Option | null>(null);
  const [jobLocation, setJobLocation] = useState<Option | null>(null);
  const [jobDescription, setJobDescription] = useState<string | undefined>(
    "Job Description"
  );
  const [minSalary, setMinSalary] = useState<number | null>(null);
  const [maxSalary, setMaxSalary] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const format = (val: string) => `$` + val;
  const parse = (val: string) => val.replace(/^\$/, "");

  const [minVal, setMinValue] = useState("0");
  const [maxVal, setMaxValue] = useState("0");

  // const [exported, setExported] = React.useState<EditorState | null>(null);

  // const navigate = useNavigate();
  const router = useRouter();

  const companyLogoPlaceholder = "https://placehold.co/600x400";

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    var jobTypeNum: number = ConvertJobTypeToNum(jobType?.value);
    var primaryTagNum: number = ConvertPrimaryTagToNum(primaryTag?.value);
    var job: CreateJobReq = {
      jobTitle: jobTitle,
      jobType: jobTypeNum,
      jobPrimaryTag: primaryTagNum,
      jobLocation: jobLocation?.value ? jobLocation?.value : "",
      jobDescription: jobDescription ? jobDescription : "",
      jobMinSalary: minSalary?.valueOf() ? minSalary?.valueOf() : 0,
      jobMaxSalary: maxSalary?.valueOf() ? maxSalary?.valueOf() : 0,
      jobCompanyName: companyName,
      jobCompanyLogoURL:
        companyLogo !== "" ? companyLogo : "https://placehold.co/600x400",
    };

    try {
      await PostJob(job).then(() => {
        setIsLoading(false);
        // const timer = setTimeout(() => {
        //   // navigate("/", { replace: true });
        //   router.push("/");
        // }, 1000);
        // clearTimeout(timer);
        router.push("/");
      });
    } catch (error) {
      setError("invalid job title or job type");
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Job Details
      </Heading>
      <FormControl id="jobTitle" isRequired>
        <FormLabel>Job Title</FormLabel>
        <Input
          name="jobTitle"
          id="jobTitle"
          placeholder="Job Title"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setJobTitle(event.currentTarget.value);
          }}
        />
      </FormControl>

      <FormControl id="jobType-Control" mt="2%" isRequired>
        <FormLabel>Job Type</FormLabel>
        <Select
          id="jobType"
          name="jobType"
          placeholder="Job Type"
          options={jobTypeOptions}
          onChange={(newValue: Option | null) => {
            setJobType(newValue);
          }}
          inputId="jobType"
          instanceId={"jobTypeInstance"}
        />
      </FormControl>

      {/* <FormControl id="position" mt="2%" isRequired>
        <FormLabel htmlFor="position">Position</FormLabel>
        <Input
          id="position"
          placeholder="Position"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setPosition(event.currentTarget.value);
          }}
        />
      </FormControl> */}

      <FormControl id="primaryTag" mt="2%" isRequired>
        <FormLabel>Primary Tag</FormLabel>
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
        <FormLabel>Job Location</FormLabel>
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

      <FormControl id="salaryRange" mt="2%" isRequired>
        <FormLabel>Salary Range</FormLabel>
        <Flex>
          <NumberInput
            id="minSalary"
            name="minSalary"
            onChange={(valueString, valueAsNumber) => {
              setMinValue(parse(valueString));
              setMinSalary(valueAsNumber);
            }}
            value={format(minVal)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          &nbsp;&nbsp;&nbsp;
          <NumberInput
            id="maxSalary"
            name="maxSalary"
            onChange={(valueString, valueAsNumber) => {
              setMaxValue(parse(valueString));
              setMaxSalary(valueAsNumber);
            }}
            value={format(maxVal)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </FormControl>

      <FormControl id="companyName" mt="2%" isRequired>
        <FormLabel>Company Name</FormLabel>
        <Input
          id="companyName"
          placeholder="Company Name"
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            var name = event.currentTarget.value;
            setCompanyName(name);
            setCompanyLogo(
              "https://logo.clearbit.com/" +
                name.replace(/ /g, "") +
                ".com?s=300"
            );
          }}
        />
      </FormControl>
      <div className="company-logo">
        <Avatar
          size={"2xl"}
          name="Company Logo"
          src={
            companyName !== "" ? companyLogo : "https://placehold.co/150x150"
          }
        />

        {/* <Image
          width={"200px"}
          borderEndColor={"black"}
          src={
            companyName !== "" ? companyLogo : "https://placehold.co/150x150"
          }
          alt="Company Logo"
        /> */}
      </div>

      <FormControl id="jobDescription" mt={1}>
        <FormLabel>Job Description</FormLabel>
        {/* <Textarea
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
        /> */}
        {/* <Editor /> */}
        {/* <Editor
        // onPublished={(p) => {
        //   setExported(p);
        // }}
        /> */}

        {/* {exported && (
          <>
            <hr />
            <h1>Output</h1>
            <Editor editable={false} initalEditorState={exported} />
          </>
        )} */}
        <MarkdownEditor value={jobDescription} onChange={setJobDescription} />
      </FormControl>

      <ThreeTierPricing />

      <PaypalPayment />

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
        p={8}
        m="10px auto"
        as="form"
      >
        {<Form1 />}
      </Box>
    </>
  );
}
