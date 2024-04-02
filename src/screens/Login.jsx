import {AbsoluteCenter, Box, Spacer} from "@chakra-ui/react";
import { NavigationBar } from "../components/NavigationBar";
import { AuthForm } from "../components/AuthForm";
import { useState } from "react";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // api login logic
  };

  return(
    <>
      <NavigationBar />
      <Spacer/>
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
          borderRadius={50}/>

        {/* Form */}
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