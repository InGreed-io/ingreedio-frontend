import { AbsoluteCenter, Box, useToast, Center, Spinner } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { useContext, useEffect, useState } from "react";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setToken, setRole, token } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    apiPost("Authentication/Login", { email, password })
      .then((response) => {
        const token = response.token;
        sessionStorage.setItem("token", token);
        setToken(token);

        const role = response.roles[0];
        sessionStorage.setItem("role", role);
        setRole(role);

        toast({
          title: "Success",
          description: "Logged in successfuly.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "Please check if all fields are filled correctly.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  }, [loading, token, navigate]);

  if (loading || token) return <Center><Spinner /></Center>;

  return (
    <>
      <AbsoluteCenter display={"flex"}>

        {/* Background rectangles*/}
        <Box
          bg="brand.primary"
          zIndex={-1}
          position={"absolute"}
          w="380px" h="150px"
          transform="translate(40%,-30%)"
          borderRadius={50} />
        <Box bg="brand.primary"
          zIndex={-1}
          position={"absolute"}
          w="380px" h="150px"
          transform="translate(-15%,190%)"
          borderRadius={50} />

        <AuthForm
          title="Login"
          onSubmit={handleSubmit}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          emailValue={email}
          passwordValue={password}
        />

      </AbsoluteCenter>
    </>
  );
};
