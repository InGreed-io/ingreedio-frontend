import { Box, Heading, Text, VStack, HStack, Badge, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import pricingContent from "../content/pricing.json";

const Pricing = () => {
  return (
    <Box p={8} bg="white" borderRadius="md" boxShadow="md" maxW="2xl" mx="auto" mt={8}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="2xl" color="brand.primary" fontFamily={"Playfair Display"}>{pricingContent.title}</Heading>
        <Text fontSize="lg" color="brand.greenishGrey">{pricingContent.description}</Text>

        <Accordion allowToggle w={"100%"}>
          {pricingContent.features.map((feature, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold" color="brand.primary">
                    {feature.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color="brand.greenishGray">
                {feature.description}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <HStack alignSelf={"end"}>
          <Text fontSize="2xl" fontWeight="bold" color="brand.greenishGray">
            {pricingContent.price}
          </Text>
          <Badge colorScheme="green">Daily</Badge>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Pricing;

