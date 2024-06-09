import { Text, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const IngredientBox = ({ id, name, isEditable = false, onDelete }) => {
  return (
    <Flex
      bg="brand.secondary"
      borderRadius={30}
      h="50px"
      w="240px"
      margin="5px"
      alignItems="center"
      paddingLeft="1em"
      paddingRight="1em"
      fontSize={20}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      justifyContent="space-between">
      <Text
        fontWeight={500}>{name}</Text>
      {isEditable ?
        <button onClick={() => onDelete(id)}>
          <CloseIcon
            display='flex'
            alignSelf='center'
            boxSize={5} />
        </button> : undefined
      }
    </Flex>
  );
};
