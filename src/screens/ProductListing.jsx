import { ProductList } from "../components/ProductList/ProductList";
import { Grid } from "@chakra-ui/react";
import { SearchSidebar } from "../components/SearchSidebar";

export const ProductListing = () => {
  return (
    <>
      <Grid templateColumns="30% 1fr" alignItems={"flex-start"}>
        <SearchSidebar />
        <ProductList />
      </Grid>
    </>
  );
};
