import { Box, Text, Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FavoriteBorder } from "@mui/icons-material";
export const IngredientBox = ({ name }) => {

    // TODO add updating preferences by clicking Heart Icon

    return (
        <Flex
            bg="brand.secondary"
            borderRadius={30}
            h="50px"
            w="240px"
            margin="5px"
            alignItems="center"
            paddingLeft="1em"
            paddingRight="0.5em"
            fontSize={20}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            justifyContent="space-between">
            <Text
                fontWeight={500}>{name}</Text>
            <Icon as={FavoriteBorder} 
            color="white"
            fontSize="2em"/>
        </Flex>
    );
}