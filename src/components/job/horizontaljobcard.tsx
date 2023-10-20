import { JobModel } from "@api/job";
import {
  Avatar,
  Card,
  CardBody,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConvertPrimaryTagNumToString } from "@utils/job";
import { GetPlaceholderImageByString } from "@utils/placeholder";
import { ConvertTimeToDaysOrHours } from "@utils/time";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

interface JobViewProps {
  job?: JobModel;
}

const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

export default function HorizontalJobview(props: JobViewProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [show, setShow] = useState(false);

  const toast = useToast();
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        className="job-card"
        onClick={(event) => {
          event.preventDefault();
          setShow(!show);
          onOpen();
        }}
        style={{ cursor: "pointer" }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "150px" }}
          maxH={{ base: "100%", sm: "150px" }}
          src={
            props.job?.jobCompanyLogoURL
              ? props.job?.jobCompanyLogoURL
              : "https://placehold.co/300x300"
          }
          alt="Company Logo"
        />
        {/* <CardHeader>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

              <Box>
                <Heading size="sm">Segun Adebayo</Heading>
                <Text>Creator, Chakra UI</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BellIcon />}
            />
          </Flex>
        </CardHeader> */}
        <Stack direction={"row"} width={"100%"}>
          <CardBody>
            <Flex letterSpacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Heading size="md">
                  {props.job?.jobTitle ? props.job?.jobTitle : "No Job Title"}
                </Heading>
              </Flex>
              <Text fontSize="sm" fontWeight={"bold"}>
                {props.job?.createdAt
                  ? ConvertTimeToDaysOrHours(props.job.createdAt)
                  : ""}
              </Text>
            </Flex>

            <Text py="1">
              {props.job?.jobCompanyName
                ? props.job?.jobCompanyName
                : "No Company Name"}
            </Text>

            {props.job ? (
              <Text fontSize={"xs"}>
                💰 {props.job.jobMinSalary + " - " + props.job.jobMaxSalary} per
                Year
              </Text>
            ) : (
              <></>
            )}

            {/* Heere */}
            {props.job ? (
              <div style={{ marginTop: "5px" }}>
                <Tag
                  size="sm"
                  variant="subtle"
                  colorScheme="cyan"
                  borderRadius="full"
                >
                  <TagLabel>
                    {ConvertPrimaryTagNumToString(props.job?.jobPrimaryTag)}
                  </TagLabel>
                </Tag>

                <Tag
                  size="sm"
                  variant="subtle"
                  colorScheme="cyan"
                  borderRadius="full"
                >
                  <TagLabel>{props.job.jobLocation}</TagLabel>
                </Tag>
              </div>
            ) : (
              <></>
            )}

            {/* {props.job?.jobPrimaryTag !== undefined ? (
              <Tag
                size="sm"
                variant="subtle"
                colorScheme="cyan"
                borderRadius="full"
                style={{ marginTop: "5px" }}
              >
                <TagLeftIcon boxSize="12px" as={AddIcon} />
                <TagLabel>
                  {ConvertPrimaryTagNumToString(props.job?.jobPrimaryTag)}
                </TagLabel>
              </Tag>
            ) : (
              <></>
            )} */}
          </CardBody>
        </Stack>
      </Card>
      {show === true ? (
        <Drawer
          onClose={() => {
            onClose();
            setShow(!show);
          }}
          isOpen={isOpen}
          size={"xl"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Text fontSize="2xl">{props.job?.jobTitle}</Text>
              <Text fontSize="xl">
                {props.job?.jobCompanyName
                  ? props.job?.jobCompanyName
                  : "No Company Name"}
              </Text>
            </DrawerHeader>

            <DrawerBody>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  size={"2xl"}
                  name="Company Logo"
                  src={
                    props.job?.jobCompanyLogoURL !== ""
                      ? props.job?.jobCompanyLogoURL
                      : GetPlaceholderImageByString(props.job.jobCompanyName)
                  }
                />
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <Container>
                  <EditerMarkdown
                    source={props.job?.jobDescription}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </Container>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <></>
      )}
    </>
  );
}
