import { Grid, Center } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

export const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiGet("products")
      .then(items => {
        setProducts(items);
      });
  }, []);

  return (
    <>
      <Center>
        <Grid
          templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)",lg: "repeat(3, 1fr)"}}
          gap={{base: 4, md: 8, lg: 10}}
          maxW="100%"
          p={{base: 4, md: 8, lg: 10}}
        >
          { products.map((product) => {
              return(
                <ProductCard product={product} key={product.id} />
              );
          })}
        </Grid>
      </Center>
    </>
  );
};
