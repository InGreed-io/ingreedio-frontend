import { ProductList } from "../components/ProductList/ProductList";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { useReducer, useState, useEffect, useContext } from "react";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { apiGet } from "../utils/api";
import { SingleSelect } from "../components/SingleSelect";
import { AuthContext } from "../components/AuthProvider";

export const ProductListing = () => {
  const { token, loading } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preferences, setPreferences] = useState(undefined);
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsPerPage, setProductsPerPage] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await apiGet("categories");
      setCategories(categoriesData.map(({ id, name }) => ({ value: id.toString(), label: name })));

      const ingredientsData = await apiGet("ingredients", { query: "", pageIndex: 0, pageSize: 5 });
      setIngredients(ingredientsData.contents.map(({ id, name }) => ({ value: id.toString(), label: name })));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && token) {
      const fetchPreferences = async () => {
        try {
          const preferencesData = await apiGet("user/preferences");
          setPreferences(preferencesData.map(({ id, name }) => ({ value: id.toString(), label: name })));
        } catch {
          setPreferences(undefined);
        }
      };

      fetchPreferences();
    }
  }, [loading, token]);

  /* eslint-disable */
  useEffect(() => {
    if (!loading && ingredients.length && categories.length) {
      const newSearchData = {
        ingredients: searchParams.getAll("ingredients").map(id => ingredients.find(ing => ing.value === id)) || [],
        query: searchParams.get("query") || searchData.query,
        category: categories.find(cat => cat.value === searchParams.get("categoryId")) || searchData.category,
        preference: preferences?.find(pref => pref.value === searchParams.get("preferenceId")) || searchData.preference,
        sortBy: searchParams.get("sortBy") || searchData.sortBy,
      };

      dispatchSearchData({ type: "update", ...newSearchData });
    }
  }, [loading, ingredients, categories, preferences, searchParams]);
  /* eslint-enable */

  useEffect(() => {
    if (!loading && searchData.category && searchData.query) {
      setSearchParams({
        categoryId: searchData.category.value,
        query: searchData.query,
        ingredients: searchData.ingredients.map(ing => ing.value),
        preferenceId: searchData.preference?.value,
        sortBy: searchData.sortBy,
      });
    }
  }, [loading, searchData, setSearchParams]);

  return (
    <Grid templateColumns="30% 1fr" alignItems="flex-start">
      <Stack position="sticky" top={30} w="100%" p={5} gap={5}>
        <Stack gap={0}>
          <SingleSelect
            onChange={(option) => dispatchSearchData({ type: "updateSortBy", sortBy: option.value })}
            value={sortMethods.find(met => met.value === searchData.sortBy)}
            options={sortMethods}
          />
          <Text fontSize={20} color="brand.greenishGray" alignSelf="start" pl={2} fontFamily="Playfair Display" fontWeight="900">
            Sort By
          </Text>
        </Stack>
        <Stack gap={0}>
          <SingleSelect
            onChange={(option) => setProductsPerPage(option.value)}
            value={{ value: productsPerPage, label: productsPerPage }}
            options={productsPerPageOptions}
          />
          <Text fontSize={20} color="brand.greenishGray" alignSelf="start" pl={2} fontFamily="Playfair Display" fontWeight="900">
            Products per page
          </Text>
        </Stack>
        <Searchbar
          searchData={searchData}
          dispatchSearchData={dispatchSearchData}
          ingredients={ingredients}
          categories={categories}
          preferences={preferences}
          withButton={false}
        />
      </Stack>
      {searchData.category && (
        <ProductList searchData={searchData} productsPerPage={productsPerPage} />
      )}
    </Grid>
  );
};
