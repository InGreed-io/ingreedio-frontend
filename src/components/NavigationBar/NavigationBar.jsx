import {
  Box, Image, Center,
  Grid, Flex, IconButton, useToast
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationLinks } from "./NavigationLinks";
import { AccountSection } from "./AccountSection";

export const NavigationBar = ({ isPanel = false, authData }) => {
  const [displayMenu, changeDisplayMenu] = useState("none");
  const toast = useToast();

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    authData.setToken(null);
    authData.setRole(null);
    toast({
      title: "Logged out",
      description: "Logged out successfuly.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Grid p={4} templateColumns='repeat(3, 1fr)' display={{ base: "none", lg: "grid" }} gap={6}>
        <Box alignSelf="center" justifySelf="start">
          <Link to="/">
            <Image h="50px" src="/logo.png" alt="Logo" data-testid="logo" />
          </Link>
        </Box>
        <Center>
          <NavigationLinks flexDirection={"row"} role={authData.role} isPanel={isPanel} />
        </Center>
        <Box alignSelf="center" justifySelf="end">
          <AccountSection username={authData.username} logout={logout} />
        </Box>
      </Grid>
      <Box display={{ base: "block", lg: "none" }}>
        <Flex p={4} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Link to="/">
              <Image h="40px" src="/logo.png" alt="Logo" data-testid="logo-hidden" />
            </Link>
          </Box>
          <IconButton
            variant={"solid"}
            background={"none"}
            aria-label="Open Menu"
            _hover={{ background: "none" }}
            icon={
              <HamburgerIcon />
            }
            onClick={() => changeDisplayMenu(displayMenu === "none" ? "flex" : "none")}
          />
        </Flex>
        <Box
          flexDirection={"column"}
          display={displayMenu}
          pb={15}
          mb={10}
        >
          <NavigationLinks isHidden={true} flexDirection={"column"} role={authData.role} isPanel={isPanel} />
          <AccountSection isHidden={true} username={authData.username} logout={logout} justifyContent="center" />
        </Box>
      </Box>
    </>
  );
};
