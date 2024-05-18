import { Flex, Text, Image } from "@chakra-ui/react";
import { IngredientBox } from "./IngredientBox";
import { ReviewBox } from "./ReviewBox";

export const ProductDetails = ({ product }) => {

  if (!product) return null;

  const {
    name,
    iconUrl,
    //ingredients,
    companyName,
    description
  } = product;

  // mock ingredient for now
  const ingredients = ["Milk"];

  // mock review for now
  const review = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

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
      <Flex
        flexDirection="row"
        flexWrap="wrap">
        {/* Mock reviews for now */}
        <ReviewBox name="Konrad" content={review}/>
        <ReviewBox name="Borys" content={review}/>
        <ReviewBox name="Marek" content={review}/>
        <ReviewBox name="Bartosz" content={review}/>
      </Flex>
    </Flex>
  );
};