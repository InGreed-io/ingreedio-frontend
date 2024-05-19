import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
