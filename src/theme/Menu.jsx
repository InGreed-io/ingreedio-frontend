import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  item: {
    _focus: {
      background: "brand.secondary"
    },
  },
  list: {
    py: 0
  }
});

export const Menu = defineMultiStyleConfig({
  baseStyle,
});
