import { Stack, Text, Spacer } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useReducer, useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import { useOutletContext } from "react-router-dom";

export const Landing = () => {
  const { token } = useOutletContext();
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preferences, setPreferences] = useState(undefined);

  useEffect(() => {
    apiGet("categories")
      .then(items => {
        items = items.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setCategories(items);
      });

    apiGet("ingredients", {
      pageIndex: 0,
      pageSize: 5,
      exclude: searchData.ingredients.map(i => i.value),
    })
      .then(items => {
        items = items.contents.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setIngredients(items);
      });
  }, [searchData.ingredients]);

  useEffect(() => {
    apiGet("user/preferences")
      .then(items => {
        items = items.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setPreferences(items);
      })
      .catch(() => {
        setPreferences(undefined);
      });
  }, [token]);

  return (
    <>
      <Spacer />
      <Stack marginBottom={20}
        fontFamily="Playfair Display"
        fontWeight={900}
        gap={0}
        fontSize={{ base: "35px", sm: "45px", md: "50px", xl: "71px" }}
      >
        <Text
          color="brand.greenishGray"
        >
          Search products by
        </Text>
        <Text color="brand.primary">
          ingredients
        </Text>
      </Stack>
      <Searchbar
        searchData={searchData}
        dispatchSearchData={dispatchSearchData}
        ingredients={ingredients}
        categories={categories}
        preferences={preferences}
      />
      <Spacer />
    </>
  );
};
