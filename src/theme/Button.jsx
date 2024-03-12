import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "full",
  },
  variants: {
    primary: {
      borderColor: "brand.greenishGray",
      background: "brand.primary",
      color: "brand.white",
    },
    secondary: {
      border: "none",
      background: "brand.secondary",
      color: "brand.greenishGray",
    }
  },
  sizes: {
    sm: {
      h: 35,
      px: 8,
      fontSize: 13,
    },
    md: {
      h: 45,
      px: 9,
      fontSize: 15,
    },
    lg: {
      h: 55,
      px: 10,
      fontSize: 17,
    },
  },
  defaultProps: {
    variant: "primary",
    size: "md",
  }
});

