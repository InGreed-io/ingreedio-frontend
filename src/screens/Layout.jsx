import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { Flex, Center } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useContext } from "react";

export const Layout = () => {
  const authData = useContext(AuthContext);

  if(authData.loading) return null;

  return (
    <Center>
      <Flex p={{ base: 3, md: 0 }} w="100%" maxW="1280px" minH="100vh" flexDirection="column">
        <NavigationBar authData={authData} />
        <Outlet context={authData} />
      </Flex>
    </Center>
  );
};

