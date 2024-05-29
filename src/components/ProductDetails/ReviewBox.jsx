import { Flex, Text, Button } from "@chakra-ui/react";
import { FlagRounded } from "@mui/icons-material";
import { Icon } from "@chakra-ui/react";
import { apiPatch } from "../../utils/api";

export const ReviewBox = ({ id, name, content, setError }) => {
  const reportReview = () => {
    apiPatch(`review/${id}/report`)
      .then(() => {
        setError("");
      })
      .catch((e) => {
        switch (e.status) {
          case 401:
            setError("You need to be logged in to post a review!");
            break;
          default:
            setError("Unexpected error occured!");
        }

      });
  }

  return (
    // TODO: add stars from reviews

    <Flex
      flexDirection="column"
      bg='brand.white'
      textAlign="start"
      padding="15px"
      paddingLeft="20px"
      borderRadius="30px"
      maxWidth="35em"
      marginRight="2em"
      marginBottom="2em">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        gap={10}>
        <Text
          fontFamily="Playfair Display"
          fontWeight="900"
          fontSize="24">
          {name}
        </Text>
        <Button bg={"brand.white"} onClick={reportReview}>
          <Icon as={FlagRounded}
            fontSize="2em"
            color="brand.greenishGray" />
        </Button>
      </Flex>
      <Text
        fontFamily="Inter"
        fontWeight="300"
        fontSize="24">
        {content}
      </Text>
    </Flex>
  );
};
