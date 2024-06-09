import { NavigationBar } from "../components/NavigationBar/NavigationBar";
import { Flex, Center } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { hasAdminPanelAccess } from "../utils/api";

export const PanelLayout = () => {
  const navigate = useNavigate();
  const authData = useContext(AuthContext);
  useEffect(() => {
    if (!authData.loading && (!authData.token || !hasAdminPanelAccess(authData.role))) {
      navigate("/");
    }
  }, [authData.token, authData.role, authData.loading, navigate]);

  if(authData.loading || !authData.token) return null;

  return (
    <Center>
      <Flex p={{ base: 3, md: 0 }} w="100%" maxW="1280px" minH="100vh" flexDirection="column">
        <NavigationBar isPanel={true} authData={authData} />
        <Outlet context={authData} />
      </Flex>
    </Center>
  );
};
