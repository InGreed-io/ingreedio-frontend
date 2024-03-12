import { Stack, Text, Spacer } from "@chakra-ui/react";
import { NavigationBar } from "../components/NavigationBar";
import { Searchbar } from "../components/Searchbar";

export const Landing = () => {
  return (
    <>
      <NavigationBar />
      <Spacer />
      <Stack marginBottom={20} fontFamily="Playfair Display" fontWeight={900} fontSize="71px">
        <Text lineHeight={0.5} color="brand.greenishGray">Search products by</Text>
        <Text color="brand.primary">ingredients</Text>
      </Stack>
      <Searchbar />
      <Spacer />
    </>
  );
};
