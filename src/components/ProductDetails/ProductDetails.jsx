import { Flex, Text, Image, Stack, Button } from "@chakra-ui/react";
import { IngredientBox } from "./IngredientBox";
import { ReviewBox } from "./ReviewBox";
import { ReviewModal } from "./ReviewModal";
import { useState } from "react";

export const ProductDetails = ({ product, reviews, setReviews, prev, next, page, maxPage }) => {
  if (!product) return null;

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
        justify="space-between"
        flexWrap="wrap">
        <Image src={iconUrl}
          borderRadius={25}
          h="400px"
          w="400px"
          margin="40px"
          marginLeft="0px"
          marginRight="80px"
          boxShadow="4px 4px 20px rgba(0, 0, 0, 0.25)" />
        <Flex flexDirection="column"
          justify="start"
          textAlign="start"
          padding="40px"
          paddingLeft="0px"
          flexWrap="wrap">
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
          <Text
            fontFamily="Inter"
            color="brand.greenishGray"
            fontWeight={300}
            fontSize={24}
            marginTop="25px">
            {description}
          </Text>
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
      <ReviewModal productId={id} setReviews={setReviews} />
      <Stack width={"100%"}>
        <Flex
          flexDirection="row"
          flexWrap="wrap">
          {reviews?.length > 0 ?
            reviews.map((review) => <ReviewBox key={review.id} id={review.id} name={review.username} content={review.text} />)
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
          >Prev</Button>
          <Text>
            {page}
          </Text>
          <Button
            isDisabled={page === maxPage}
            onClick={next}
            size={"md"}>Next</Button>
        </Flex>
      </Stack>
    </Flex>
  );
};
