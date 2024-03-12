import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontWeight: 800,
    borderWidth: 2,
    boxSizing: "content-box",
  },
});

const primary = definePartsStyle({
  field: {
    borderColor: "brand.greenishGray",
    color: "brand.greenishGray",
    borderWidth: 2,
    textAlign: "start",
    background: "brand.secondary"
  },
});

export const Input = defineMultiStyleConfig({
  baseStyle,
  variants: {
    primary,
  },
  sizes: {
    sm: definePartsStyle({
      field: {
        h: 31,
        minH: 31,
        maxH: 31,
        px: 3,
        fontSize: 15,
        borderRadius: 18,
      },
      addon: {
        h: 31,
      },
      element: {
        h: 31,
      }
    }),
    md: definePartsStyle({
      field: {
        h: 41,
        minH: 41,
        maxH: 41,
        px: 4,
        fontSize: 17,
        borderRadius: 23,
      },
      addon: {
        h: 41,
      },
      element: {
        h: 41,
      }
    }),
    lg: definePartsStyle({
      field: {
        h: 51,
        minH: 51,
        maxH: 51,
        px: 3,
        fontSize: 17,
        borderRadius: 30,
      },
      addon: {
        h: 51,
      },
      element: {
        h: 51,
      }
    }),
  },
  defaultProps: {
    variant: "primary",
  }
});

