import { Stack, Text, Spacer } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { useReducer, useState, useEffect, useContext } from "react";
import { apiGet } from "../utils/api";
import { AuthContext } from "../components/AuthProvider";

export const Landing = () => {
  const { token, loading } = useContext(AuthContext);
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
      query: "",
      pageIndex: 0,
      pageSize: 5,
    })
      .then(items => {
        items = items.contents.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setIngredients(items);
      });
  }, []);

  useEffect(() => {
    if (!loading && token) {
      apiGet("user/preferences")
        .then(items => {
          items = items.map(({ id, name }) => ({ value: id.toString(), label: name }));
          setPreferences(items);
        })
        .catch(() => {
          setPreferences(undefined);
        });
    }
  }, [loading, token]);

  return (
    <>
      <Spacer />
      <Stack marginBottom={20}
        fontFamily="Playfair Display"
        fontWeight={900}
        fontSize={{ base: "35px", sm: "45px", md: "50px", xl: "71px" }}
      >
        <Text
          lineHeight={0.5}
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
