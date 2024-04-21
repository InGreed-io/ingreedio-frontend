import { GridItem, Stack, Image, Text, Box } from "@chakra-ui/react";

export const ProductCard = ({ product }) => {
  return (
    <GridItem bg="brand.white" p={10} borderRadius={15} textAlign="center">
      <Stack h={"100%"} justifyContent={"space-between"}>
        { product.featured ?
          <Box alignSelf={"flex-start"} fontSize={10}>
            <Text>Featured</Text>
          </Box>
          : null}
        <Image borderRadius={15} src={product.iconUrl} />
        <Text>{product.name}</Text>
      </Stack>
    </GridItem>
  );
};
