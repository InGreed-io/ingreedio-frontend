import { Flex, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";


export const Ingredient = ({ name, wanted, onDelete }) => {

  return (
    <Flex bg={wanted ? "brand.primary" : "#F08C8C"}
      textAlign="center"
      justifyContent="space-between"
      alignContent="center"
      borderRadius="30"
      mr="5px"
      mb="5px"
      p="5px"
      pl="7px"
    >
      <Text
        fontSize='16'
        color='white'
        pr='0.5em'
      >{name}</Text>

      <button onClick={onDelete}>
        <CloseIcon
          display='flex'
          alignSelf='center'
          color='white'
          h='0.5em'
          pr='5px' />
      </button>

    </Flex>
  );
};