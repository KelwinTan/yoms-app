import { GetCurrentlySignedInUser, SignOut } from "@api/auth";
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type link = {
  name: string;
  link: string;
};

const Links: link[] = [
  {
    link: "/",
    name: "Jobs",
  },
  // coming soon
  // {
  //   link: "/",
  //   name: "Job Boards",
  // },
];

const NavLink = ({ children }: { children: link }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={children.link}
  >
    {children.name}
  </Link>
);

export default function NavWithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    GetCurrentlySignedInUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) =>
        console.error("Error getting currently signed-in user:", error)
      );
  });

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>IndoDev</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {colorMode === "light" ? (
              <MoonIcon
                onClick={toggleColorMode}
                boxSize={6}
                style={{ cursor: "pointer", margin: "0 10px" }}
              >
                Toggle
              </MoonIcon>
            ) : (
              <SunIcon
                onClick={toggleColorMode}
                boxSize={6}
                style={{ cursor: "pointer", margin: "0 10px" }}
              >
                Toggle
              </SunIcon>
            )}
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={() => router.push("/job/post")}
            >
              Post a Job
            </Button>

            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={user.photoURL || ""} />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      router.push("/user/profile");
                    }}
                  >
                    View Profile
                  </MenuItem>
                  {/* <MenuItem></MenuItem> */}
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      SignOut();
                      router.push("/");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} background="teal.500" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push("/auth/login")}>
                    Login
                  </MenuItem>
                  <MenuItem>Register</MenuItem>
                </MenuList>
              </Menu>
            )}

            {/* <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={""} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile | Coming Soon</MenuItem>
                <MenuDivider />
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
