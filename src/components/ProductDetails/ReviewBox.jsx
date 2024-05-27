import { Flex, Text } from "@chakra-ui/react";
import { FlagRounded } from "@mui/icons-material";
import { Icon } from "@chakra-ui/react";

export const ReviewBox = ({ name, content }) => {
  return (

  // todo add stars from reviews, writing reviews and flagging reviews

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
        <Icon as={FlagRounded} 
          fontSize="2em"
          color="brand.greenishGray"/>
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
