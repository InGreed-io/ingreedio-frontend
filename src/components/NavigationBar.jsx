import {
  Box, Image, Button, Center, ButtonGroup,
  Grid
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      <Box alignSelf="center" justifySelf="start">
        <Link to="/">
          <Image h="92px" src="/logo.png" />
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
  );
};
