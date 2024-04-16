import { Stack, Text, Spacer } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";

export const Landing = () => {
  return (
    <>
      <Spacer />
      <Stack marginBottom={20}
        fontFamily="Playfair Display"
        fontWeight={900}
        fontSize={{base: "35px", sm:"45px", md: "50px", xl: "71px"}}
      >
        <Text
          lineHeight={0.5}
          color="brand.greenishGray"
        >
          Search products by
        </Text>
        <Text color="brand.primary">
          ingredients
        </Text>
      </Stack>
      <Searchbar />
      <Spacer />
    </>
  );
};
