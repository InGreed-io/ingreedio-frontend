import { Flex, Stack, Text } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { useReducer, useState, useEffect } from "react";
import { initialSearchData, searchReducer } from "../reducers/searchReducer";
import { apiGet } from "../utils/api";
import { SingleSelect } from "../components/SingleSelect";
import { PanelProductList } from "../components/Panel/PanelProductList";

export const PanelProductListing = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsPerPage, setProductsPerPage] = useState(9);

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

  /* eslint-disable */
  useEffect(() => {
    const searchParamsFallback = {
      ingredientsIds: searchParams.getAll("ingredients"),
      query: searchParams.get("query"),
      categoryId: searchParams.get("categoryId"),
      sortBy: searchParams.get("sortBy"),
    };

    if (searchParamsFallback && ingredients.length > 0 && categories.length > 0) {
      const newSearchData = { ingredients: [] };

      if (!searchData.query && searchParamsFallback.query) {
        newSearchData.query = searchParamsFallback.query;
      }

      if (!searchData.category && searchParamsFallback.categoryId) {
        newSearchData.category = categories.find(cat => cat.value === searchParamsFallback.categoryId);
      }

      if (searchData.ingredients.filter(x => x).length === 0 &&
        searchParamsFallback.ingredientsIds.filter(x => x).length > 0) {
        newSearchData.ingredients = searchParamsFallback.ingredientsIds
          .map(ingId => ingredients.find(ing => ing.value === ingId));
      }

      newSearchData.sortBy = !searchParamsFallback.sortBy ? searchData.sortBy : searchParamsFallback.sortBy;

      if (newSearchData.category || newSearchData.query || newSearchData.ingredients.length > 0) {
        dispatchSearchData({
          type: "update",
          category: newSearchData.category,
          query: newSearchData.query || "",
          ingredients: newSearchData.ingredients,
          sortBy: newSearchData.sortBy,
        });
      }
    }
  }, [ingredients, categories]);
  /* eslint-enable */

  useEffect(() => {
    if (searchData.category) {
      setSearchParams({
        categoryId: searchData.category.value || "",
        query: searchData.query,
        ingredients: searchData.ingredients.map(ingredients => ingredients.value),
        sortBy: searchData.sortBy,
      });
    }
  }, [searchData, setSearchParams]);

  return (
    <>
      <Flex flexDirection={"column"} alignItems={"flex-start"}>
        <Flex flexDirection={"column"} top={30} w={"100%"} p={5} gap={5}>
          <Flex w={"100%"} gap={5}>
            <Stack gap={0} flexGrow={3}>
              <SingleSelect
                onChange={(option) => {
                  dispatchSearchData({
                    type: "updateSortBy",
                    sortBy: option.value,
                  });
                }}
                value={sortMethods.find(met => met.value === searchData.sortBy)}
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
            <Stack gap={0} flexGrow={1}>
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
          </Flex>
          <Searchbar
            searchData={searchData}
            dispatchSearchData={dispatchSearchData}
            ingredients={ingredients}
            categories={categories}
            withButton={false}
          />
        </Flex>
        <PanelProductList
          searchData={searchData}
          productsPerPage={productsPerPage}
        />
      </Flex>
    </>
  );
};
