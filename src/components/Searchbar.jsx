import { Input } from "@chakra-ui/input";
import { Button, Center, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useEffect, useReducer, useState } from "react";
import { Form } from "react-router-dom";
import { apiGet } from "../utils/api";

export const Searchbar = () => {
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
    <>
      <Center>
        <Form method="get" action="/products">
          <Flex
            gap={3}
            flexWrap="wrap"
            p={10}
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Stack minW={200} gap={0} flexGrow={2}>
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
            <Stack minW={200} flexGrow={2}>
              <FormControl isRequired>
                <Input placeholder="Search phrase"
                  name="searchPhrase"
                  aria-label="Search phrase"
                  defaultValue={searchData.searchPhrase}
                  w={"100%"}
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
            <Stack minW={400} gap={0} flexGrow={3}>
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
            <Button type="submit" maxW={100} justifySelf={"flex-end"} flexGrow={1} size="lg">
              Search
            </Button>
          </Flex>
        </Form>
      </Center>
    </>
  );
};
