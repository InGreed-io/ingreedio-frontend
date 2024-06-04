import { GridItem, Stack, Image, Text, Box, Flex, IconButton } from "@chakra-ui/react";
import { StaticRating } from "../ProductDetails/Rating";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { apiPost, apiDelete } from "../../utils/api";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const ProductCard = ({ product, isAuthorized }) => {
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(product.favourite);

  const renderErrorToast = (title) => {
    toast({
      title,
      description: "Something went wrong, contact administration.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const favoriteAction = (e) => {
    e.preventDefault();

    if (isFavorite) {
      apiDelete(`products/${product.id}/favourite`).then(() => {
        setIsFavorite(false);
      }).catch(() => {
        renderErrorToast(`Cannot remove ${product.name} from favorites`);
      });
    } else {
      apiPost(`products/${product.id}/favourite`).then(() => {
        setIsFavorite(true);
      }).catch(() => {
        renderErrorToast(`Cannot add ${product.name} to favorites`);
      });
    }
  };

  return (
    <GridItem bg="brand.white" p={10} borderRadius={15} textAlign="center" position="relative">
      { isAuthorized ?
        <IconButton
          icon={isFavorite ? <Favorite /> : <FavoriteBorder />}
          aria-label="Add to favorites"
          position="absolute"
          zIndex={1}
          boxSize={14}
          onClick={favoriteAction}
          top={-5}
          right={-5}
          borderRadius="50%"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "2rem"
            }
          }}
        />
        : undefined }
      <Stack h={"100%"} justifyContent={"space-between"}>
        {product.featured ?
          <Box alignSelf={"flex-start"} fontSize={10}>
            <Text>Featured</Text>
          </Box>
          : null}
        <Image borderRadius={15} src={product.iconUrl} />
        <Text>{product.name}</Text>
        <Flex alignItems={"center"} justifyContent={"center"} gap={5}>
          <StaticRating rating={product.rating} size={6} />
          <Text>({product.ratingsCount})</Text>
        </Flex>
      </Stack>
    </GridItem>
  );
};

