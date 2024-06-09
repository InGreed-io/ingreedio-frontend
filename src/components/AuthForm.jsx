import { VStack, HStack, Input, Text, Button, FormControl, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AuthForm = (props) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");
  const toast = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number.");
      return;
    }
    if (!/[@$!%*?&]/.test(password)) {
      setPasswordError("Password must contain at least one special character (@, $, !, %, *, ?, or &).");
      return;
    }

    setPasswordError("");
    return true;
  };
  const validateRepeatPassword = (repeatPassword) => {
    if (!(repeatPassword === props.passwordValue)) {
      setRepeatError("Passwords must match.");
      return;
    }
    setRepeatError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || passwordError || (props.isRegister && repeatError)) {
      toast({
        title: "Error.",
        description: "Please check if all fields are filled correctly.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      props.onSubmit();
    }
  };



  return (
    <VStack
      display="flex"
      as="form"
      onSubmit={handleSubmit}
      h={props.isRegister ? "450px" : "390px"}
      w="480px"
      bg="brand.secondary"
      borderRadius={40}
      padding="70px"
      paddingTop={props.isRegister ? "40px" : "70px"}
      spacing="20px"
      position="relative">
      <Text
        fontFamily="Playfair Display"
        fontWeight={900}
        fontSize={40}
        alignSelf="start"
        color="brand.greenishGray">
        {props.title}
      </Text>
      <FormControl isRequired isInvalid={emailError}>
        <Input
          background="brand.background"
          placeholder="Email"
          type="email"
          width="90%"
          value={props.emailValue}
          onChange={(e) => {
            props.onEmailChange(e);
            validateEmail(e.target.value);
          }} />
        <FormErrorMessage marginLeft="10px" marginTop="0px">{emailError}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={passwordError}>
        <Input
          background="brand.background"
          placeholder="Password"
          width="90%"
          type="password"
          value={props.passwordValue}
          onChange={(e) => {
            props.onPasswordChange(e);
            validatePassword(e.target.value);
          }} />
        <FormErrorMessage marginLeft="10px" marginTop="0px">{passwordError}</FormErrorMessage>
      </FormControl>
      {props.isRegister && (
        <FormControl isRequired isInvalid={repeatError}>
          <Input
            background="brand.background"
            placeholder="Repeat Password"
            width="90%"
            type="password"
            value={props.repeatPasswordValue}
            onChange={(e) => {
              props.onRepeatPasswordChange(e);
              validateRepeatPassword(e.target.value);
            }} />
          <FormErrorMessage marginLeft="10px" marginTop="0px">{repeatError}</FormErrorMessage>
        </FormControl>
      )}

      <HStack justify={"end"} w="100%" spacing="5%">
        {props.isRegister && (
          <Link to="/login">
            <Button variant="link" color="brand.greenishGray">
                            Already got an account?
            </Button>
          </Link>
        )}
        <Button alignSelf={"end"} size="md" type="submit">
          {props.isRegister ? "Register" : "Login"}
        </Button>
      </HStack>

    </VStack>
  );
};
