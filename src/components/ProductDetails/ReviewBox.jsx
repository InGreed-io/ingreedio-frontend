import { Flex, Text, Button, useToast } from "@chakra-ui/react";
import { FlagRounded } from "@mui/icons-material";
import { Icon } from "@chakra-ui/react";
import { StaticRating } from "./Rating";
import { apiDelete, apiPatch } from "../../utils/api";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useOutletContext } from "react-router-dom";

export const ReviewBox = ({ setPageResetted, review, isPanel, onDelete }) => {
  const toast = useToast();
  const { userId } = useOutletContext();

  const reportReview = () => {
    apiPatch(`review/${review.id}/report`)
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

  const deleteReview = () => {
    apiDelete(`review/${review.id}`)
      .then(() => {
        toast({
          title: "Success.",
          description: "Review has been deleted successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setPageResetted(p => !p);
      })
      .catch((e) => {
        switch (e.status) {
        case 401:
          toast({
            title: "Error.",
            description: "You need to be logged in to delete a review!",
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
      marginBottom="2em"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
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
        {
          isPanel ?
            <IconButton
              bg='red'
              w='3em'
              h='3em'
              icon={<DeleteIcon />}
              onClick={() => onDelete(review.id)}
            />
            :
            <Flex justifyContent={"flex-end"}>
              <Button p={0} bg={"brand.white"} onClick={reportReview}>
                <Icon as={FlagRounded}
                  fontSize="2em"
                  color="brand.greenishGray" />
              </Button>
              { userId === review.userId ?
                <Button p={0} bg={"brand.white"} onClick={deleteReview}>
                  <Icon as={DeleteIcon}
                    fontSize="2em"
                    color="red.400" />
                </Button>
                : undefined }
            </Flex>
        }
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
