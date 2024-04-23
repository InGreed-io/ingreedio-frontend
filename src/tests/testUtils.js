import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.jsx";

jest.mock("../utils/values", () => ({
  getApiUri: jest.fn().mockImplementation(() => "http://api.ingreed.io/test")
}));

const AllTheProviders = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
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
