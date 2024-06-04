import { Flex, Stack, Text, Spinner, Center } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { productsPerPageOptions, sortMethods } from "../utils/productListing";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SingleSelect } from "../components/SingleSelect";
import useProductListing from "../hooks/useProductListing";
import { hasAdminPanelAccess } from "../utils/api";
import { AuthContext } from "../components/AuthProvider";
import { PanelProductList } from "../components/ProductList/PanelProductList";

export const PanelProductListing = () => {
  const navigate = useNavigate();
  const [productsPerPage, setProductsPerPage] = useState(9);
  const { loading, token, role } = useContext(AuthContext);
  const { ingredients, categories, dataLoaded, searchData, dispatchSearchData } = useProductListing(loading, token, true);

  useEffect(() => {
    if (!loading && (!token || !hasAdminPanelAccess(role))) {
      navigate("/");
    }
  }, [token, role, loading, navigate]);

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
          isAuthorized={false}
          endpoint={"panel/products"}
        />
      </Flex>
    </>
  );
};
