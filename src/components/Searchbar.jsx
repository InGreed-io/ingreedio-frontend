import { Input } from "@chakra-ui/input";
import { Button, Center, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useEffect, useReducer, useState } from "react";
import { apiGet } from "../utils/api";

export const Searchbar = () => {
  // TODO: use it in parent and pass it as prop or even provide context for it in App.jsx.
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

  const handleSubmit = (/*e*/) => {
    // maybe route to other screen with query params and same state reducer
    // then make POST request to obtain list of products
  };

  return (
    <>
      <Center>
        <form onSubmit={handleSubmit}>
          <Flex
            gap={3}
            maxW={{base: "100%", sm: 400, md: 700, lg: 900, xl: 1050}}
            wrap="wrap"
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            <Stack w={{base: "90%", sm: 190, md: 300, lg: 400, xl: 200}} gap={0}>
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
            <Stack w={{base: "90%", sm: 190, md: 300, lg: 400, xl: 200}}>
              <FormControl isRequired>
                <Input placeholder="Search phrase"
                  name="searchPhrase"
                  aria-label="Search phrase"
                  w={{base: "90%", sm: 140, md: 250, lg: 350, xl: 150}}
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
            <Stack minW={{base: "90%", sm: 280, md: 500, lg: 700, xl: 400}} gap={0}>
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
    </>
  );
};
