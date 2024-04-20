import { ProductList } from "../components/ProductList/ProductList";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { useReducer, useState, useEffect } from "react";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { apiGet } from "../utils/api";
import { SingleSelect } from "../components/SingleSelect";

export const ProductListing = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [searchParams] = useSearchParams();
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [sortBy, setSortBy] = useState(0);

  const searchParamsFallback = {
    ingredientsIds: searchParams.getAll("ingredients"),
    searchPhrase: searchParams.get("searchPhrase"),
    categoryId: searchParams.get("category"),
  };

  useEffect(() => {
    apiGet("categories")
      .then(items => {
        items = items.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setCategories(items);
      });
    apiGet("ingredients", {
      query: "",
      page: 0,
      limit: 5,
    })
      .then(items => {
        items = items.content.map(({ id, name }) => ({ value: id.toString(), label: name }));
        setIngredients(items);
      });
  }, []);

  useEffect(() => {
    if (searchParamsFallback && ingredients.length > 0 && categories.length > 0) {
      const newSearchData = { ingredients: [] };

      if (!searchData.searchPhrase && searchParamsFallback.searchPhrase) {
        newSearchData.searchPhrase = searchParamsFallback.searchPhrase;
      }

      if (!searchData.category && searchParamsFallback.categoryId) {
        newSearchData.category = categories.find(cat => cat.value === searchParamsFallback.categoryId);
      }

      if (searchData.ingredients.filter(x => x).length === 0 &&
        searchParamsFallback.ingredientsIds.filter(x => x).length > 0) {
        newSearchData.ingredients = searchParamsFallback.ingredientsIds
          .map(ingId => ingredients.find(ing => ing.value === ingId));
      }

      if (newSearchData.category || newSearchData.searchPhrase || newSearchData.ingredients.length > 0) {
        dispatchSearchData({
          type: "update",
          category: newSearchData.category,
          searchPhrase: newSearchData.searchPhrase,
          ingredients: newSearchData.ingredients,
        });
      }
    }
  }, [ingredients]);

  return (
    <>
      <Grid templateColumns="30% 1fr" alignItems={"flex-start"}>
        <Stack position={"sticky"} top={30} w={"100%"} p={5} gap={5}>
          <Stack gap={0}>
            <SingleSelect
              onChange={(option) => setSortBy(option.value)}
              value={sortMethods.find(met => met.value === sortBy)}
              options={sortMethods}
            />
            <Text fontSize={20}
              color="brand.greenishGray"
              alignSelf="start"
              pl={2}
              fontFamily="Playfair Display"
              fontWeight="900">
              Sort By
            </Text>
          </Stack>
          <Stack gap={0}>
            <SingleSelect
              onChange={(option) => setProductsPerPage(option.value)}
              value={{ value: productsPerPage, label: productsPerPage }}
              options={productsPerPageOptions}
            />
            <Text fontSize={20}
              color="brand.greenishGray"
              alignSelf="start"
              pl={2}
              fontFamily="Playfair Display"
              fontWeight="900">
              Products per page
            </Text>
          </Stack>
          <Searchbar
            searchData={searchData}
            dispatchSearchData={dispatchSearchData}
            ingredients={ingredients}
            categories={categories}
          />
        </Stack>
        <ProductList
          searchData={searchParamsFallback}
          searchParams={searchParams}
          sortBy={sortBy}
          limit={productsPerPage} />
      </Grid>
    </>
  );
};
