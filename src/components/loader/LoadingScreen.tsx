import { Flex, Spinner, Stack } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.600"
          size="xl"
        />
      </Flex>
    </Stack>
  );
};

export default LoadingScreen;
