import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    fontWeight: 800,
    borderWidth: 2,
  },
  addon: {
    boxSizing: "border-box",
  },
  element: {
    boxSizing: "border-box",
  }
});

const primary = definePartsStyle({
  field: {
    borderColor: "brand.greenishGray",
    color: "brand.greenishGray",
    borderWidth: 2,
    textAlign: "start",
    bg: "brand.secondary",
    width: "auto",
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
        h: 35,
        px: 3,
        fontSize: 15,
        borderRadius: 18,
      },
      addon: {
        h: 35,
      },
      element: {
        h: 35,
      }
    }),
    md: definePartsStyle({
      field: {
        h: 45,
        px: 4,
        fontSize: 17,
        borderRadius: 23,
      },
      addon: {
        h: 45,
      },
      element: {
        h: 45,
      }
    }),
    lg: definePartsStyle({
      field: {
        h: 55,
        px: 5,
        fontSize: 17,
        borderRadius: 30,
      },
      addon: {
        h: 55,
      },
      element: {
        h: 55,
      }
    }),
  },
  defaultProps: {
    variant: "primary",
  }
});

