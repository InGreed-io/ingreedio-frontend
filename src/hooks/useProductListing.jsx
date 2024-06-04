import { useState, useEffect, useContext, useReducer } from "react";
import { AuthContext } from "../components/AuthProvider";
import { searchReducer, initialSearchData } from "../reducers/searchReducer";
import { useSearchParams } from "react-router-dom";
import { mapToSelectObject } from "../utils/api";
import { apiGet } from "../utils/api";

export const ingredientsInSelect = 5;

const mapSearchParams = (searchParams) => ({
  query: searchParams.get("query"),
  ingredients: searchParams.getAll("ingredients"),
  categoryId: searchParams.get("categoryId"),
  sortBy: searchParams.get("sortBy"),
  preferenceId: searchParams.get("preferenceId"),
});

const searchParamsFromSearchData = (searchData) => ({
  query: searchData.query || "",
  ingredients: searchData.ingredients?.map(i => i.value) || [],
  categoryId: searchData.category?.value || "",
  preferenceId: searchData.preference?.value || "",
  sortBy: searchData.sortBy || initialSearchData.sortBy,
});

function useProductListing(handleSearchParams = true) {
  const { token, loading } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preferences, setPreferences] = useState(undefined);
  const [searchData, dispatchSearchData] = useReducer(searchReducer, initialSearchData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [productsReady, setProductsReady] = useState(false);

  const buildNewSearchData = (mappedSearchParams) => ({
    query: mappedSearchParams.query,
    ingredients: ingredients.filter(i => mappedSearchParams.ingredients.includes(i.value)),
    category: categories.find(c => c.value === mappedSearchParams.categoryId),
    sortBy: mappedSearchParams.sortBy || initialSearchData.sortBy,
    preference: preferences?.find(c => c.value === mappedSearchParams.preferenceId),
  });

  const fetchCategories = async () => {
    try {
      const categoriesData = await apiGet("categories");
      const mappedCategories = mapToSelectObject(categoriesData);
      setCategories(mappedCategories);
    } catch {
      setCategories([]);
    }
  };

  const fetchIngredients = async (mappedSearchParams) => {
    try {
      const ingredientsData = await apiGet("ingredients", { pageIndex: 0, pageSize: ingredientsInSelect, exclude: mappedSearchParams.ingredients });
      const mappedIngredients = mapToSelectObject(ingredientsData.contents);

      if (handleSearchParams && mappedSearchParams.ingredients.length > 0) {
        const searchParamsIncludedIngredientsData = await apiGet("ingredients", { pageIndex: 0, pageSize: ingredientsInSelect, include: mappedSearchParams.ingredients });
        const mappedSearchParamsIncludedIngredients = mapToSelectObject(searchParamsIncludedIngredientsData.contents);
        mappedIngredients.push(...mappedSearchParamsIncludedIngredients);
      }

      setIngredients(mappedIngredients);
    } catch {
      setIngredients([]);
    }
  };

  const reFetchIngredients = async (excludedIngredientIds) => {
    try {
      const ingredientsData = await apiGet("ingredients", { pageIndex: 0, pageSize: ingredientsInSelect, exclude: excludedIngredientIds });
      const mappedIngredients = mapToSelectObject(ingredientsData.contents);

      setIngredients(mappedIngredients);
    } catch {
      setIngredients([]);
    }
  };

  const fetchPreferences = async () => {
    try {
      const preferencesData = await apiGet("user/preferences");
      const mappedPreferences = mapToSelectObject(preferencesData);
      setPreferences(mappedPreferences);
    } catch {
      setPreferences(undefined);
    }
  };

  useEffect(() => {
    if (!loading) {
      const mappedSearchParams = mapSearchParams(searchParams);
      setDataLoading(true);

      Promise.all([
        fetchCategories(),
        fetchIngredients(mappedSearchParams),
        token && fetchPreferences()
      ]).then(() => {
        setDataLoading(false);
      });
    }
  }, [loading, token]);

  useEffect(() => {
    if (!dataLoading) {
      const mappedSearchParams = mapSearchParams(searchParams);
      const newSearchData = buildNewSearchData(mappedSearchParams);

      dispatchSearchData({ type: "update", ...newSearchData });
      setProductsReady(true);
    }
  }, [dataLoading]);

  useEffect(() => {
    if (productsReady) {
      reFetchIngredients(searchData.ingredients.map(i => i.value));
      if(handleSearchParams)
        setSearchParams(searchParamsFromSearchData(searchData));
    }
  }, [searchData]);

  return { dataLoaded: productsReady, searchData, dispatchSearchData, ingredients, preferences, categories }
}

export default useProductListing;
