import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import FooterWithLogoCentered from "@components/navigation/footer";
import NavWithAction from "@components/navigation/navbar";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="404 page not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavWithAction />

      <Container height={"100vh"} display={"flex"}>
        <Box textAlign="center" py={10} px={6} margin={"auto"}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, teal.400, teal.600)"
            backgroundClip="text"
          >
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text color={"gray.500"} mb={6}>
            The page you re looking for does not seem to exist
          </Text>

          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            onClick={() => {
              router.push("/");
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Container>

      <FooterWithLogoCentered />
    </>
  );
}
