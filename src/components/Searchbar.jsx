import { Input } from "@chakra-ui/input";
import { Button, Center, Flex } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { categories } from "../mocks/categories";
import { ingredients } from "../mocks/ingredients";

export const Searchbar = () => {
  return (
    <>
      <Center>
        <Flex maxW={1050} justifyContent="center" alignItems="stretch" gap={5} >
          <SingleSelect options={categories} controlProps={{ w: "200px"}} />
          <Input placeholder="Search phrase"
            size="lg" />
          <MultiSelect options={ingredients} controlProps={{ w: "400px" }} />          
          <Button size="lg">
              Search
          </Button>
        </Flex>
      </Center>
    </>
  );
};
