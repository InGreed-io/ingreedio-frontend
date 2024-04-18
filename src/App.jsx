import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Landing } from "./screens/Landing";
import { Login } from "./screens/Login";
import { Flex, Center } from "@chakra-ui/react";
import { SignUp } from "./screens/SignUp";

export const App = () => {
  return (
    <>
      <Center>
        <Flex w="100%" maxW="1280px" minH="100vh" flexDirection="column">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
            </Routes>
          </BrowserRouter>
        </Flex>
      </Center>
    </>
  );
};

