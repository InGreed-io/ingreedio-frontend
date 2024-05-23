import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Navigate } from "react-router-dom";
import {
  Button, Flex, Heading, Divider, Text, Accordion, Switch, SimpleGrid, Input, GridItem,
  Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import { PreferencesAccordion } from "../components/UserPanel/PreferencesAccordion";


export const Details = () => {
  const categories = ["Food", "Cosmetics", "Drinks"];

  const { token, loading } = useContext(AuthContext);

  const handleAddCategory = () => {
    // todo
  };



  if (loading || !token) {
    return (<Navigate to="/" replace />);
  }

  return (
    <Flex
      marginLeft={["0%", null, null , "11%"]} // add margin if width > 992px (Chakra stuff)
      marginRight={["0%", null, null , "11%"]}
      flexDirection="column"
      justify="space-between"
      fontFamily="Inter"
      textColor="brand.greenishGray"
      h="90vh"
    >
      <Flex flexDirection='column'>
        <Flex
          flexDirection="row"
          justify="space-between"
          marginBottom="0.5em"
        >
          <Heading>
            Preferences
          </Heading>
          <Menu>
            <MenuButton as={Button}
              backgroundColor='brand.secondary'
              color='brand.greenishGray'
              h='40px'
              w='100px'
              px='0px'>
              Add new
            </MenuButton>
            <MenuList
              zIndex='3'
              borderRadius='30px'>
              {
                categories.map(category =>
                  <MenuItem 
                    key={category}
                    borderRadius='inherit' 
                    fontWeight="700"
                    onClick={handleAddCategory}>{category}</MenuItem>)
              }
            </MenuList>
          </Menu>

        </Flex>
        <Divider borderWidth="1px" borderColor="#000" />
        <Accordion allowToggle reduceMotion>
          {
            categories.map(category =>
              <PreferencesAccordion key={category} type={category} />)
          }

        </Accordion>
      </Flex>
      <Flex flexDirection="column" my='2em'>
        <Heading textAlign="start" marginBottom="0.5em">
          Settings
        </Heading>
        <Divider borderWidth="1px" borderColor="#000" />
        <Flex
          marginTop="1em"
          marginLeft="5%"
          marginRight="5%"
          flexDirection="column"
          justify="start"
          fontSize="20px"
          textAlign="start"
          fontWeight="700">
          <Text>Notifications</Text>
          <Flex
            flexDirection="row"
            alignItems="center"
            marginBottom="2em">
            <Switch marginRight="1em" size="lg"></Switch>
            <Text>Get special offers and new products listing directly to your email</Text>
          </Flex>

          <SimpleGrid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" alignItems="center" justifyItems="start"
            rowGap="1em"
            columnGap="1em"
            fontWeight="700"
            marginRight="250px"
          >
            <GridItem>
              <Text>Email</Text>
              <Input type='email' backgroundColor="brand.background" />
            </GridItem>

            <GridItem>
              <Button marginTop="2em">Change password</Button>
            </GridItem>

            <GridItem>
              <Text>First name</Text>
              <Input />
            </GridItem>

            <GridItem>
              <Text>Last name</Text>
              <Input />
            </GridItem>

          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>

  );
};
