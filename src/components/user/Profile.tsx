import { Container } from "@chakra-ui/react";
import Content from "@components/user/profile/content/Content";
import Sidebar from "@components/user/profile/side-profile/Sidebar";

const ProfileView2 = () => {
  return (
    <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
      <Sidebar />
      <Content />
    </Container>
  );
};

export default ProfileView2;
