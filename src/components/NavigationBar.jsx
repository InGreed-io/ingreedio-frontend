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
            <Link to="/about">
            <Button aria-label="About Us">
                          About Us
            </Button>
            </Link>
            <Link to="/pricing">
            <Button aria-label="Pricing">
                          Pricing
            </Button>
            </Link>
            <Link to="/tos">
            <Button aria-label="Terms and Conditions">
                          Terms and Conditions
            </Button>
            </Link>
          </ButtonGroup>
        </Center>
        <Box alignSelf="center" justifySelf="end">
          <ButtonGroup gap="5">
            <Link to="/login" style={{alignSelf: "center"}}>
            <Button variant="link" aria-label="Log In">
                          Log In
            </Button>
            </Link>
            <Link to="/signup">
            <Button px="5" aria-label="Sign Up">
                          Sign Up
            </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Grid>
      <Box display={{base: "block", md: "none"}}>
        <Flex p={4} justifyContent={"space-between"} alignItems={"center"}>
          <Box>
            <Link to="/">
              <Image h="40px" src="/logo.png" alt="Logo" data-testid="logo-hidden"/>
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
          <Link to="/about">
            <Button aria-label='About Us Hidden'>
              About Us
            </Button>
            </Link>
            <Link to="/pricing">
            <Button aria-label='Pricing Hidden'>
              Pricing
            </Button>
            </Link>
            <Link to="/tos">
            <Button aria-label='Terms and Conditions Hidden'>
              Terms and Conditions
            </Button>
            </Link>
          </ButtonGroup>
          <ButtonGroup justifyContent={"center"} mt={3}>
            <Link to="/login">
            <Button variant={"link"} px={3} aria-label="Log In Hidden">
              Log In
            </Button>
            </Link>
            <Link to="/signup">
            <Button size={"sm"} p={3} aria-label="Sign Up Hidden">
              Sign Up
            </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};
