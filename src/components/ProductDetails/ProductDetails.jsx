import { Box, Flex, Text, Image, Stack, Button, Center, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IngredientBox } from "./IngredientBox";
import { ReviewBox } from "./ReviewBox";
import { ReviewModal } from "./ReviewModal";
import { StaticRating } from "./Rating";

export const ProductDetails = ({ product, reviews, prev, next, page, maxPage, setPageResetted }) => {
  if (!product) return <Center><Spinner /></Center>;

  const {
    id,
    name,
    iconUrl,
    ingredients,
    companyName,
    description
  } = product;

  return (
    <Flex
      align="start"
      justifyContent="start"
      flexDirection="column"
      flexWrap="wrap">
      <Flex flexDirection="row"
        justifyContent="center"
        flexWrap={"wrap"}>
        <Image src={iconUrl}
          borderRadius={25}
          w="400px"
          margin="40px"
          boxShadow="4px 4px 20px rgba(0, 0, 0, 0.25)" />
        <Flex flexDirection="column"
          justify="start"
          gap={5}
          textAlign="start"
          paddingTop="40px"
          flexShrink={1}>
          <Text
            fontFamily="Playfair Display"
            color="#000000"
            fontWeight={900}
            fontSize={36}>
            {name}
          </Text>
          <Text
            fontFamily="Inter"
            color="brand.greenishGray"
            fontWeight={100}
            fontSize={24}
            textDecoration="underline">
            {companyName}
          </Text>
          <Flex alignItems={"center"} gap={5}>
            <StaticRating rating={product.rating} size={{ base: 8, sm: 10 }} />
            <Text fontSize={30}>({product.ratingsCount})</Text>
          </Flex>
          <Box maxW={800}>
            <Text
              fontFamily="Inter"
              color="brand.greenishGray"
              fontWeight={300}
              fontSize={24}>
              {description}
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Text
        fontFamily="Playfair Display"
        color="brand.primary"
        fontWeight={900}
        fontSize={36}>
        Ingredients:
      </Text>

      <Flex
        flexWrap="wrap">
        {ingredients ? (ingredients.map((p, index) => <IngredientBox key={index} name={p} />)) : ""}
      </Flex>
      <Text
        fontFamily="Playfair Display"
        color="brand.primary"
        fontWeight={900}
        fontSize={36}
        margin="25px"
        marginLeft="0px">
        Reviews:
      </Text>
      <ReviewModal productId={id} setPageResetted={setPageResetted} />
      <Stack width={"100%"}>
        <Flex
          flexDirection="row"
          justifyContent={"center"}
          gap={{ base: 0, md: 10 }}
          flexWrap="wrap">
          {reviews?.length > 0 ?
            reviews.map((review) => <ReviewBox key={review.id} id={review.id} name={review.username} content={review.text} rating={review.rating} />)
            :
            <Text>You can be first to review this product!</Text>}
        </Flex>
        <Flex
          justifyContent={"center"}
          gap={5}
          alignItems={"center"}>
          <Button
            size={"md"}
            isDisabled={page === 0}
            onClick={prev}
          ><ChevronLeftIcon fontSize={"lg"} /></Button>
          <Text>
            {page}
          </Text>
          <Button
            isDisabled={page === maxPage}
            onClick={next}
            size={"md"}><ChevronRightIcon fontSize={"lg"} /></Button>
        </Flex>
      </Stack>
    </Flex>
  );
};
