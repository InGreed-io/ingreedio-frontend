import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Landing } from "./screens/Landing";
import { Flex, Center } from "@chakra-ui/react";

export const App = () => {
  return (
    <>
      <Center>
        <Flex w="100%" maxW="1280px" minH="100vh" flexDirection="column">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing/>}/>
            </Routes>
          </BrowserRouter>
        </Flex>
      </Center>
    </>
  );
};

