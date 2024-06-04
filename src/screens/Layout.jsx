import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { Flex, Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Center>
      <Flex w="100%" maxW="1280px" minH="100vh" flexDirection="column">
        <NavigationBar />
        <Outlet />
      </Flex>
    </Center>
  );
};
