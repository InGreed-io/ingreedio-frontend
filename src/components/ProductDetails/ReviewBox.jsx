import { Flex, Text } from "@chakra-ui/react";

export const ReviewBox = ({ name, content }) => {
    return (
        <Flex
            flexDirection="column"
            bg='#D9D9D9'
            textAlign="start"
            padding="15px"
            paddingLeft="20px"
            borderRadius="30px"
            maxWidth="35em"
            marginRight="2em"
            marginBottom="2em">
            <Text
                fontFamily="Playfair Display"
                fontWeight="900"
                fontSize="36">
                {name}
            </Text>
            <Text
                fontFamily="Inter"
                fontWeight="300"
                fontSize="24">
                {content}
            </Text>
        </Flex>
    );
}