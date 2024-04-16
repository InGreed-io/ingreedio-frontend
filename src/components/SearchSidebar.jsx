import { Input } from "@chakra-ui/input";
import { Button, Center, Flex, FormControl, FormLabel, Box, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useEffect, useReducer, useState } from "react";
import { apiGet } from "../utils/api";

export const SearchSidebar = () => {
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);

  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiGet("categories")
      .then(items => {
        items = items.map(({ id, name }) => ({ value: id, label: name }));
        setCategories(items);
      });

    apiGet("ingredients")
      .then(items => {
        items = items.map(({ id, name }) => ({ value: id, label: name }));
        setIngredients(items);
      });
  }, []);

  return (
    <Box position="sticky" top={30}>
      <Center>
        <form>
          <Flex
            gap={3}
            maxW={"100%"}
            wrap="wrap"
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            <Stack w={"90%"} gap={0}>
              <FormControl>
                <SingleSelect
                  name="category"
                  defaultValue={searchData.category}
                  onChange={
                    (category) => dispatchSearchData({
                      type: "updateCategory",
                      category
                    })
                  }
                  options={categories} />
                <FormLabel fontSize={20}
                  color="brand.greenishGray"
                  alignSelf="start"
                  pl={2}
                  fontFamily="Playfair Display"
                  fontWeight="900">
                    Category
                </FormLabel>
              </FormControl>
            </Stack>
            <Stack w={"90%"}>
              <FormControl isRequired>
                <Input placeholder="Search phrase"
                  name="searchPhrase"
                  aria-label="Search phrase"
                  w={"90%"}
                  defaultValue={searchData.searchPhrase}
                  onChange={
                    (e) => dispatchSearchData({
                      type: "updateSearchPhrase",
                      searchPhrase: e.target.value,
                    })
                  }
                  size="lg" />
                <FormLabel fontSize={20}
                  color="brand.greenishGray"
                  alignSelf="start"
                  pl={2}
                  fontFamily="Playfair Display"
                  fontWeight="900">
                    Search phrase
                </FormLabel>
              </FormControl>
            </Stack>
            <Stack minW={"90%"} gap={0}>
              <FormControl isRequired>
                <MultiSelect
                  name="ingredients"
                  defaultValue={searchData.ingredients}
                  onChange={
                    (ingredients) => dispatchSearchData({
                      type: "updateIngredients",
                      ingredients
                    })
                  }
                  options={ingredients} />
                <FormLabel fontSize={20}
                  color="brand.greenishGray"
                  alignSelf="start"
                  pl={2}
                  fontFamily="Playfair Display"
                  fontWeight="900">
                    Ingredients
                </FormLabel>
              </FormControl>
            </Stack>
            <Button type="submit" maxW={100} size="lg">
                Search
            </Button>
          </Flex>
        </form>
      </Center>
    </Box>
  );
};
