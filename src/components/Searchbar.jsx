import { Input } from "@chakra-ui/input";
import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { categories } from "../mocks/categories";
import { ingredients } from "../mocks/ingredients";

export const Searchbar = () => {
  return (
    <>
      <Center>
        <Flex
          gap={3}
          maxW={{base: "100%", sm: 400, md: 700, lg: 900, xl: 1050}}
          wrap="wrap"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          <Stack w={{base: "90%", sm: 190, md: 300, lg: 400, xl: 200}} gap={0}>
            <SingleSelect options={categories} />
            <Text fontSize={20}
              color="brand.greenishGray"
              alignSelf="start"
              pl={2}
              fontFamily="Playfair Display"
              fontWeight="900">
                Category
            </Text>
          </Stack>
          <Stack w={{base: "90%", sm: 190, md: 300, lg: 400, xl: 200}} gap={0}>
            <Input placeholder="Search phrase"
              size="lg" />
            <Text fontSize={20}
              color="brand.greenishGray"
              alignSelf="start"
              pl={2}
              fontFamily="Playfair Display"
              fontWeight="900">
                Search phrase
            </Text>
          </Stack>
          <Stack minW={{base: "90%", sm: 280, md: 500, lg: 700, xl: 400}} gap={0}>
            <MultiSelect options={ingredients} />          
            <Text fontSize={20}
              color="brand.greenishGray"
              alignSelf="start"
              pl={2}
              fontFamily="Playfair Display"
              fontWeight="900">
                Ingredients
            </Text>
          </Stack>
          <Button maxW={100} size="lg">
              Search
          </Button>
        </Flex>
      </Center>
    </>
  );
};
