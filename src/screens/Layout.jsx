import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { Flex, Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Center>
      <Flex p={{ base: 3, md: 0 }} w="100%" maxW="1280px" minH="100vh" flexDirection="column">
        <NavigationBar />
        <Outlet />
      </Flex>
    </Center>
  );
};
