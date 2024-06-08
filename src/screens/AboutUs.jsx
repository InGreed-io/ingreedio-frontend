import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import content from '../content/aboutUs.json';

const AboutUs = () => {
  return (
    <Box p={8} bg="white" borderRadius="md" boxShadow="md" maxW="2xl" mx="auto" mt={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="2xl" color="brand.primary" fontFamily={"Playfair Display"}>{content.title}</Heading>
        {content.paragraphs.map((paragraph, index) => (
          <Text key={index} fontSize="lg" color="gray.600">
            {paragraph}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default AboutUs;

