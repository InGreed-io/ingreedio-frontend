import { extendTheme } from "@chakra-ui/react";
import { Button } from "./theme/Button";
import { Input } from "./theme/Input";
import { Menu } from "./theme/Menu";

export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#468448",
      secondary: "#FEDC6C",
      darkGray: "#333333",
      greenishGray: "#4E554F",
      white: "#FFFFFF",
      background: "#F5F5E0"
    }
  },
  components: {
    Button,
    Input,
    Menu,
  }
});
