import { Input } from "@chakra-ui/input";
import { Button, Flex, FormControl, Box, FormLabel, Stack } from "@chakra-ui/react";
import { SingleSelect } from "./SingleSelect";
import { Form } from "react-router-dom";
import { apiGet } from "../utils/api";
import { AsyncMultiSelect } from "./AsyncMultiSelect";

export const Searchbar = ({ searchData, dispatchSearchData, ingredients, categories, preferences, withButton = true }) => {
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
                name="categoryId"
                value={searchData.category}
                onChange={
                  (category) => dispatchSearchData({
                    type: "updateCategory",
                    category,
                  })
                }
                defaultValue={{ label: "All Categories", value: "" }}
                options={[{label: "All Categories", value: "" }, ...categories]} />
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
          { preferences ?
            <Stack minW={100} gap={0} flexGrow={1} flexShrink={0}>
              <FormControl>
                <SingleSelect
                  name="preferenceId"
                  value={searchData.preference}
                  onChange={
                    (preference) => dispatchSearchData({
                      type: "updatePreference",
                      preference,
                    })
                  }
                  options={preferences} />
                <FormLabel fontSize={20}
                  color="brand.greenishGray"
                  alignSelf="start"
                  pl={2}
                  fontFamily="Playfair Display"
                  fontWeight="900">
                Preference
                </FormLabel>
              </FormControl>
            </Stack>
            : undefined }
          <Stack minW={100} flexGrow={1} justifyContent={"stretch"} flexShrink={1}>
            <FormControl isRequired>
              <Input placeholder="Search phrase"
                name="query"
                aria-label="Search phrase"
                defaultValue={searchData.query}
                h={"58.2"}
                w={"100%"}
                onChange={
                  (e) => {
                    dispatchSearchData({
                      type: "updateQuery",
                      query: e.target.value,
                    });
                  }
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
          <Stack minW={200} gap={0} flexBasis={300} flexGrow={3} flexShrink={1}>
            <FormControl>
              <AsyncMultiSelect
                name="ingredients"
                placeholder="Ingredients..."
                value={searchData.ingredients}
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
                      pageIndex: 0,
                      pageSize: 5,
                      exclude: searchData.ingredients.map(i => i.value),
                    })
                      .then(items => {
                        items = items.contents.map(({ id, name }) => ({ value: id, label: name })).concat(searchData.ingredients);
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
          {
            withButton ?
              <Button type="submit" maxW={100} size="lg">
                Search
              </Button>
              : undefined
          }
        </Flex>
      </Form>
    </Box>
  );
};
