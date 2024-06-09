import { Flex, Text, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { StaticRating } from "./Rating";
import { DeleteIcon } from "@chakra-ui/icons";

export const ReportedReviewBox = ({ review, onDelete }) => {
  return (
    <Flex
      flexDirection="column"
      bg='brand.white'
      textAlign="start"
      w={"100%"}
      padding="15px"
      paddingLeft="20px"
      borderRadius="30px"
      maxWidth="35em"
      marginBottom="2em"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
      <Link to={`/product/${review.productId}`}>
        <Text fontSize={35}>
          {review.productName}
        </Text>
      </Link>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        flexWrap={"wrap-reverse"}
        gap={10}>
        <Text
          fontFamily="Playfair Display"
          fontWeight="900"
          fontSize="24">
          {review.username}
        </Text>
        <IconButton
          bg='red'
          w='3em'
          h='3em'
          icon={<DeleteIcon />}
          onClick={() => onDelete(review.id)}
        />
      </Flex>
      <StaticRating size={6} rating={review.rating} />
      <Text
        fontFamily="Inter"
        fontWeight="300"
        fontSize="24">
        {review.text}
      </Text>
    </Flex>
  );
};
