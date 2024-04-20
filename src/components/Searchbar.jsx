import { Input } from "@chakra-ui/input";
import { Button, Flex, FormControl, Box, FormLabel, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { Form } from "react-router-dom";
import { apiGet } from "../utils/api";
import { AsyncMultiSelect } from "./AsyncMultiSelect";

export const Searchbar = ({ searchData, dispatchSearchData, ingredients, categories }) => {
  return (
    <Box>
      <Form method="get" action="/products">
        <Flex
          gap={3}
          flexWrap="wrap"
          w={"100%"}
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Stack minW={100} gap={0} flexGrow={1} flexShrink={0}>
            <FormControl>
              <SingleSelect
                name="category"
                value={searchData.category}
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
              <AsyncMultiSelect
                name="ingredients"
                placeholder="Ingredients..."
                value={searchData.ingredients}
                defaultValue={searchData.ingredients}
                onChange={
                  (ingredients) => {
                    return dispatchSearchData({
                      type: "updateIngredients",
                      ingredients
                    });
                  }
                }
                loadOptions={
                  (inputValue, callback) => {
                    apiGet("ingredients", {
                        query: inputValue,
                        page: 0,
                        limit: 5
                      })
                      .then(items => {
                        items = items.map(({ id, name }) => ({ value: id, label: name }));
                        callback(items);
                      });
                  }
                }
                defaultOptions={ingredients} />
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
