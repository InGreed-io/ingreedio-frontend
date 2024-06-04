import { Flex, Stack, Text, Spinner, Center } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { useState } from "react";
import { SingleSelect } from "../components/SingleSelect";
import { PanelProductList } from "../components/Panel/PanelProductList";
import useProductListing from "../hooks/useProductListing";

export const PanelProductListing = () => {
  const [productsPerPage, setProductsPerPage] = useState(9);
  const { ingredients, categories, dataLoaded, searchData, dispatchSearchData } = useProductListing(true);

  if (!dataLoaded) return <Center><Spinner /></Center>;

  return (
    <>
      <Flex flexDirection={"column"} alignItems={"flex-start"}>
        <Flex flexDirection={"column"} top={30} w={"100%"} p={5} gap={5}>
          <Flex w={"100%"} gap={5}>
            <Stack gap={0} flexGrow={1}>
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
