import { Box, Text, Flex } from "@chakra-ui/react";
export const IngredientBox = ({ name }) => {
    return (
        <Flex
            bg="brand.secondary"
            borderRadius={30}
            h="50px"
            w="240px"
            margin="5px"
            alignItems="center"
            paddingLeft="20px"
            fontSize={20}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            <Text
                fontWeight={500}>{name}</Text>
        </Flex>
    );
}