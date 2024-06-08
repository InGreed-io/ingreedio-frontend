import { Flex, Text } from "@chakra-ui/react";

export const Ingredient = ({ name, wanted, onDelete }) => {

  return (
    <Flex bg={wanted ? "brand.primary" : "#F08C8C"}
      textAlign="center"
      justifyContent="space-between"
      alignContent="center"
      //w='90px'
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
        <Text 
          fontSize='16'
          fontWeight='900'
          color='white'
          pr='5px'
        >x</Text>
      </button>

    </Flex>
  );
};