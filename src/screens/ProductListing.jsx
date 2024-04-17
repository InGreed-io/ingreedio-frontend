import { ProductList } from "../components/ProductList/ProductList";
import { Grid } from "@chakra-ui/react";
import { Searchbar } from "../components/Searchbar";
import { useSearchParams } from "react-router-dom";

export const ProductListing = () => {
  const [searchParams] = useSearchParams();

  const searchDataFallback = {
    ingredients: searchParams.getAll("ingredients"),
    searchPhrase: searchParams.get("searchPhrase"),
    category: searchParams.get("category"),
  };

  return (
    <>
      <Grid templateColumns="30% 1fr" alignItems={"flex-start"}>
        <Searchbar searchDataFallback={searchDataFallback} />
        <ProductList />
      </Grid>
    </>
  );
};
