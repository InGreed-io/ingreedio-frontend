import { Flex, Text, Button, useToast } from "@chakra-ui/react";
import { FlagRounded } from "@mui/icons-material";
import { Icon } from "@chakra-ui/react";
import { StaticRating } from "./Rating";
import { apiPatch } from "../../utils/api";

export const ReviewBox = ({ id, name, content, rating }) => {
  const toast = useToast();

  const reportReview = () => {
    apiPatch(`review/${id}/report`)
      .then(() => {
        toast({
          title: "Success.",
          description: "Review has been reported successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        switch (e.status) {
        case 401:
          toast({
            title: "Error.",
            description: "You need to be logged in to post a review!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: "Error.",
            description: "Unexpected error occured!",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }

      });
  };

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
      marginBottom="2em">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        flexWrap={"wrap-reverse"}
        gap={10}>
        <Text
          fontFamily="Playfair Display"
          fontWeight="900"
          fontSize="24">
          {name}
        </Text>
        <Flex justifyContent={"flex-end"}>
        <Button p={0} bg={"brand.white"} onClick={reportReview}>
          <Icon as={FlagRounded}
            fontSize="2em"
            color="brand.greenishGray" />
        </Button>
        </Flex>
      </Flex>
      <StaticRating size={6} rating={rating} />
      <Text
        fontFamily="Inter"
        fontWeight="300"
        fontSize="24">
        {content}
      </Text>
    </Flex>
  );
};
