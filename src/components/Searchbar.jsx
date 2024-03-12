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
        <Flex gap={3} minW={1050} maxW={1050} justifyContent="space-evenly" alignItems="stretch">
          <Stack minW="220px" gap={0}>
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
          <Stack minW="200px" gap={0}>
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
          <Stack minW="500px" gap={0}>
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
          <Button size="lg">
              Search
          </Button>
        </Flex>
      </Center>
    </>
  );
};
