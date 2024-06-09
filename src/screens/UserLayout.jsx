import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { Flex, Center } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export const UserLayout = () => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  useEffect(() => {
    if (!authData.loading && !authData.token) {
      navigate("/");
    }
  }, [authData.token, authData.role, authData.loading, navigate]);

  if(authData.loading || !authData.token) return null;

  return (
    <Center>
      <Flex w="100%" maxW="1280px" minH="100vh" flexDirection="column">
        <NavigationBar isPanel={false} authData={authData} />
        <Outlet context={authData} />
      </Flex>
    </Center>
  );
};
