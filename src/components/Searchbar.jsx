import { Input } from "@chakra-ui/input";
import { Button, Flex, FormControl, Box, FormLabel, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { MultiSelect } from "./MultiSelect";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Form } from "react-router-dom";
import { apiGet } from "../utils/api";

export const Searchbar = ({ searchParamsFallback }) => {
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

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

  useEffect(() => {
    // if (ingredients.length > 0 &&
    //   searchParamsFallback &&
    //   searchParamsFallback.ingredientsIds.filter(x => x).length > 0 &&
    //   searchData.ingredients.filter(x => x).length === 0) {
    //   dispatchSearchData({
    //     type: "updateIngredients",
    //     ingredients: searchParamsFallback.ingredientsIds
    //     .map(ingId => ingredients.find(ing => ing.value === ingId)),
    //   })
    //   console.log("done")
    // }

    if(searchParamsFallback) {
      if(searchParamsFallback.searchPhrase && !searchData.searchPhrase) {
        dispatchSearchData({
          type: "updateSearchPhrase",
          searchPhrase: searchParamsFallback.searchPhrase,
        });
      }

      if(searchParamsFallback.categoryId && !searchData.category) {
        dispatchSearchData({
          type: "updateCategory",
          category: { value: searchParamsFallback.categoryId },
        });
      }
    }


  }, [ingredients]);

  setSelectedCategory(categories.find(cat => cat.value === searchData.category));
  console.log("searchData: ", searchData);

  return (
    <Box position={"sticky"} top={30} w={"100%"}>
      <Form method="get" action="/products">
        <Flex
          gap={3}
          flexWrap="wrap"
          p={5}
          w={"100%"}
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Stack minW={100} gap={0} flexGrow={1} flexShrink={0}>
            <FormControl>
              <SingleSelect
                name="category"
                value={selectedCategory}
                onChange={
                  (category) => dispatchSearchData({
                    type: "updateCategory",
                    category,
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
          <Stack minW={100} flexGrow={1} justifyContent={"stretch"} flexShrink={0}>
            <FormControl isRequired>
              <Input placeholder="Search phrase"
                name="searchPhrase"
                aria-label="Search phrase"
                defaultValue={searchData.searchPhrase}
                h={"58.2"}
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
          <Stack minW={200} gap={0} flexBasis={300} flexGrow={3} flexShrink={0}>
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
      </Form>
    </Box>
  );
};
