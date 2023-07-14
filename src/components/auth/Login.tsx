import {
  GetCurrentlySignedInUser,
  HandleGoogleProvider,
  HandleLogin,
} from "@api/auth";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GitHubIcon, GoogleIcon } from "@components/icons/ProviderIcons";
import LoadingScreen from "@components/loader/LoadingScreen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PasswordField } from "./PasswordField";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    HandleLogin(email, password);
  };

  useEffect(() => {
    GetCurrentlySignedInUser().then((user) => {
      if (user) {
        router.push("/");
      } else {
        setAuthorized(true);
      }
    });
  });

  return authorized ? (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Don t have an account? <Link color={"blue.400"}>Sign Up</Link> ✌️
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setEmail(event.currentTarget.value);
              }}
            />
          </FormControl>
          <PasswordField
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setPassword(event.currentTarget.value);
            }}
          />
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleSubmit}
            >
              Sign in
            </Button>

            <Box position="relative" padding="3">
              <Divider />
            </Box>

            <ButtonGroup>
              <Button
                w={"full"}
                variant={"outline"}
                onClick={HandleGoogleProvider}
                leftIcon={<GoogleIcon />}
              ></Button>
              <Button
                w={"full"}
                variant={"outline"}
                onClick={HandleGoogleProvider}
                leftIcon={<GitHubIcon />}
              ></Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  ) : (
    <LoadingScreen />
  );
}

export default LoginCard;
