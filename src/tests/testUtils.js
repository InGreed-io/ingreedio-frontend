import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "../theme.jsx";

const AllTheProviders = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        {children}
      </Router>
    </ChakraProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

export * from "@testing-library/react";

export { customRender as render };
