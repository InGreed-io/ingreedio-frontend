import React from 'react';
import {
  Box, Image, Button, Center, ButtonGroup,
  Grid, Flex, IconButton
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const [displayMenu, changeDisplayMenu] = useState("none");

  return (
    <>
      <Grid p={4} templateColumns='repeat(3, 1fr)' display={{base: "none", md: "grid"}} gap={6}>
        <Box alignSelf="center" justifySelf="start">
          <Link to="/">
            <Image h="50px" src="/logo.png" alt="Logo" data-testid="logo"/>
          </Link>
        </Box>
        <Center>
          <ButtonGroup gap="5" variant="link">
            <Button>
                          About Us
            </Button>
            <Button>
                          Pricing
            </Button>
            <Button>
                          Terms and Conditions
            </Button>
          </ButtonGroup>
        </Center>
        <Box alignSelf="center" justifySelf="end">
          <ButtonGroup gap="5">
            <Button variant="link">
                          Log In
            </Button>
            <Button px="5">
                          Sign Up
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <Box display={{base: "block", md: "none"}}>
        <Flex p={4} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Link to="/">
              <Image h="40px" src="/logo.png" alt="Logo" data-testid="logo-hamburgermenu"/>
            </Link>
          </Box>
          <IconButton
            variant={"solid"}
            background={"none"}
            aria-label="Open Menu"
            _hover={{background: "none"}}
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
          <ButtonGroup flexDirection={"column"} gap={2} spacing={0} p={2} variant="link">
            <Button>
              About Us
            </Button>
            <Button>
              Pricing
            </Button>
            <Button>
              Terms and Conditions
            </Button>
          </ButtonGroup>
          <ButtonGroup justifyContent={"center"} mt={3}>
            <Button variant={"link"} px={3}>
              Log In
            </Button>
            <Button size={"sm"} p={3}>
              Sign Up
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
