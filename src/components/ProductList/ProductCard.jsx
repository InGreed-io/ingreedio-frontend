import { GridItem, Stack, Center, Image, Text } from "@chakra-ui/react";

export const ProductCard = ({ product }) => {
  return (
    <GridItem bg="brand.white" p={10} borderRadius={15} textAlign="center">
      <Stack h={"100%"} justifyContent={"space-between"}>
        <Image borderRadius={15} src={product.iconUrl} />
        <Text>{product.name}</Text>
      </Stack>
    </GridItem>
  );
};
