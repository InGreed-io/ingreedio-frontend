import { AbsoluteCenter, Spinner, Box, useToast, Center } from "@chakra-ui/react";
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setToken, token, loading } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    apiPost("Authentication/Register", { email, password })
      .then((response) => {
        if(response.errors)
        {
          toast({
            title: "Error.",
            description: "Please check if all fields are filled correctly.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          throw new Error("SingUp failed");
        }
        const token = response.token;
        sessionStorage.setItem("token", token);
        setToken(token);
        toast({
          title: "Success",
          description: "Account registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) =>{
        console.error(error);
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
          transform="translate(40%,-30%)"
          w="380px" h="150px"
          borderRadius={50} />
        <Box bg="brand.primary"
          zIndex={-1}
          position={"absolute"}
          transform="translate(-15%,230%)"
          w="380px" h="150px"
          borderRadius={50} />

        {/* Form */}
        <AuthForm
          title="Register"
          onSubmit={handleSubmit}
          isRegister
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onRepeatPasswordChange={(e) => setRepeatPassword(e.target.value)}
          emailValue={email}
          passwordValue={password}
          repeatPasswordValue={repeatPassword} />

      </AbsoluteCenter>
    </>
  );
};
