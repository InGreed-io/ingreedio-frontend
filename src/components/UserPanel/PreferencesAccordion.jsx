import { Button, AccordionButton, Text, AccordionItem, AccordionPanel, Divider, Flex } from "@chakra-ui/react";
import { AsyncMultiSelect } from "../AsyncMultiSelect";

export const PreferencesAccordion = ({ type }) => {

  return (
    <AccordionItem
      textColor="white"
      background="transparent"
      fontWeight="700"
      fontSize="20px">
      <Flex
        position='relative'
        zIndex="2"
        px="0px"
        my='0.5em'>
        <AccordionButton
          px='1em'
          flex='1'
          textAlign='center'
          h='2em'
          backgroundColor="brand.primary"
          borderRadius="30px"
          fontSize={["17px", "20px"]}
          fontWeight="700"
          alignItems="center"
          justifyContent="space-between"
          verticalAlign="middle"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          _hover={{ background: "" }}
          mr='-100px'
        >
          <Text>{type} preferences </Text>
        </AccordionButton>
        <Button mr='10px'
          variant="secondary" alignSelf="center" h='27px' w='88px'>Delete</Button>

      </Flex>
      <AccordionPanel
        pt='0px'
        pb={4}
        px='0px'
        position='relative'
        zIndex="1"
      >
        <Flex
          flexDirection="row"
          bg="brand.secondary"
          borderRadius="30px"
          justify="space-between"
          textColor="brand.greenishGray"
          textAlign="start"
          h="200px"
          mt='-2em'
          pt='2em'>
          <Flex w="100%" pl='1em' pr='1em' flexDirection='column' >
            <Text>Preferred ingredients</Text>
            <AsyncMultiSelect
              placeholder="Add preferred ingredient"
              size='sm'
              name='Preferred'
              variant='white' />
          </Flex>
          <Divider h='95%' orientation="vertical" borderWidth="1px" borderColor='brand.greenishGray'></Divider>
          <Flex w="100%" pl='1em' pr='1em' flexDirection='column'>
            <Text w='100%'>Prohibited ingredients</Text>
            <AsyncMultiSelect
              placeholder="Add prohibited ingredient"
              size='sm'
              name='Preferred'
              variant='white' />
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};