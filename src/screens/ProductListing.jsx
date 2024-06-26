import { ProductList } from "../components/ProductList/ProductList";
import { Grid, Stack, Text, Spinner, Center } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { SingleSelect } from "../components/SingleSelect";
import useProductListing from "../hooks/useProductListing";
import { useState } from "react";

export const ProductListing = () => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const { ingredients, preferences, categories, dataLoaded, searchData, dispatchSearchData } = useProductListing(true);

  if (!dataLoaded) return <Center><Spinner /></Center>;

  return (
    <Grid templateColumns={{ base: "1fr", md: "30% 1fr"}} alignItems="flex-start">
      <Stack position={{base: "static", md: "sticky"}} top={30} w="100%" p={5} gap={5}>
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
      <ProductList searchData={searchData} productsPerPage={productsPerPage} endpoint={"products"} />
    </Grid>
  );
};

