import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import termsContent from "../content/termsAndConditions.json";

const TermsAndConditions = () => {
  return (
    <Box p={8} bg="white" borderRadius="md" boxShadow="md" maxW="2xl" mx="auto" mt={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="2xl" color="brand.primary" fontFamily={"Playfair Display"}>{termsContent.title}</Heading>
        {termsContent.sections.map((section, index) => (
          <Box key={index}>
            <Heading as="h2" size="md" color="brand.primary" mt={4}>
              {section.heading}
            </Heading>
            <Text fontSize="lg" color="brand.greenishGray" mt={2}>
              {section.content}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TermsAndConditions;

