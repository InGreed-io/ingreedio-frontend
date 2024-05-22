import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { switchAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys);

export const Switch = defineMultiStyleConfig({
  baseStyle: {
    track: {
      bg: "brand.greenishGray",
      _checked: {
        bg: "brand.primary",
      }
    }
  },
});