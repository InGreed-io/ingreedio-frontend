import { Grid, Center, Spinner, Text, Flex, Stack, Button } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { apiGet } from "../../utils/api";

export const ProductList = ({ searchData, searchParams, limit, sortBy }) => {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [searchParams]);

  useEffect(() => {
    apiGet("products",
      {
        query: searchData.searchPhrase,
        page: page,
        limit: limit,
        categoryId: searchData.categoryId,
        sortBy: sortBy,
      })
      .then(items => {
        setPageCount(items.pageCount);
        setProducts(items.content);
      });
  }, [searchData, page, sortBy, limit]);

  return (
    <>
      <Center>
        {products ?
          products.length > 0 ?
            <Stack
              mb={20}
              fontSize={"20px"}
              color={"brand.greenishGray"}
              fontWeight={900} >
              <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                gap={{ base: 4, md: 8, lg: 10 }}
                maxW="100%"
                p={{ base: 4, md: 8, lg: 10 }}
              >
                {products.map((product) => {
                  return (
                    <ProductCard product={product} key={product.id} />
                  );
                })}
              </Grid>
              <Flex
                justifyContent={"center"}
                gap={5}
                alignItems={"center"}>
                <Button
                  size={"md"}
                  isDisabled={page === 0}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >Prev</Button>
                <Text>
                  {page}
                </Text>
                <Button
                  isDisabled={page === pageCount - 1}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  size={"md"}>Next</Button>
              </Flex>
            </Stack>
            :
            <Text
              mt={20}
              fontFamily="Playfair Display"
              fontWeight={900}
              color={"brand.greenishGray"}
              fontSize={{ base: "20px", sm: "30px", md: "40px", xl: "55px" }}>
              No results found
            </Text>
          :
          <Spinner mt={20} />
        }
      </Center>
    </>
  );
};
