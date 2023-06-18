import { JobModel } from "@api/job";
import { AddIcon, BellIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ConvertPrimaryTagNumToString } from "@utils/job";
import { useRef, useState } from "react";

interface JobViewProps {
  job?: JobModel;
}

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
          console.log("HELLO JOB CARD");
          setShow(!show);
          onOpen();
        }}
        style={{ cursor: "pointer" }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          maxH={{ base: "100%", sm: "200px" }}
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
                  {props.job?.jobCompanyName
                    ? props.job?.jobCompanyName
                    : "No Company Name"}
                </Heading>
              </Flex>
              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BellIcon />}
              />
            </Flex>

            <Text py="2">
              {props.job?.jobTitle ? props.job?.jobTitle : "No Job Title"}
            </Text>

            <Text py="2">
              {props.job?.jobDescription
                ? props.job?.jobDescription
                : "No Description"}
            </Text>

            {props.job?.jobPrimaryTag !== undefined ? (
              <Tag
                size="md"
                variant="subtle"
                colorScheme="cyan"
                borderRadius="full"
              >
                <TagLeftIcon boxSize="12px" as={AddIcon} />
                <TagLabel>
                  {ConvertPrimaryTagNumToString(props.job?.jobPrimaryTag)}
                </TagLabel>
              </Tag>
            ) : (
              <></>
            )}
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
            <DrawerHeader>{props.job?.jobTitle}</DrawerHeader>
            <DrawerBody>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  maxH={{ base: "100%", sm: "150px" }}
                  src={
                    props.job?.jobCompanyLogoURL
                      ? props.job?.jobCompanyLogoURL
                      : "https://placehold.co/300x300"
                  }
                  alt="Company Logo"
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Heading as="h4" size="md">
                  Job Description
                </Heading>
                <p>{props.job?.jobDescription}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Consequat nisl vel pretium lectus quam id. Semper quis lectus
                  nulla at volutpat diam ut venenatis. Dolor morbi non arcu
                  risus quis varius quam quisque. Massa ultricies mi quis
                  hendrerit dolor magna eget est lorem. Erat imperdiet sed
                  euismod nisi porta. Lectus vestibulum mattis ullamcorper
                  velit.
                </p>
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
