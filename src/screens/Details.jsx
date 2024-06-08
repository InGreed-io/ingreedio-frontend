import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Navigate } from "react-router-dom";
import {
  Button, Flex, Heading, Divider, Text, Accordion, Switch, useDisclosure
} from "@chakra-ui/react";
import { PreferencesAccordion } from "../components/UserPanel/PreferencesAccordion";
import { PreferenceModal } from "../components/UserPanel/PreferenceModal";
import { apiGet } from "../utils/api";


export const Details = () => {

  const [preferences, setPreferences] = useState([]);
  const { token, loading } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddPreference = () => {
    onOpen();
  };

  const handleNewPreference = (newPreference) => {
    setPreferences([...preferences, newPreference]);
  };

  const handleDeletePreference = (preferenceId) => {
    const updatedPreferences = preferences.filter(
      (preference) => preference.id !== preferenceId
    );
    setPreferences(updatedPreferences);
  };

  useEffect(() => {
    apiGet("User/preferences")
      .then((body) => {
        setPreferences(body);
      });
  }, []);

  if (loading || !token) {
    return (<Navigate to="/" replace />);
  }

  return (
    <Flex
      marginLeft={["0%", null, null, "11%"]} // add margin if width > 992px (Chakra stuff)
      marginRight={["0%", null, null, "11%"]}
      flexDirection="column"
      justify="start"
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
          <Button
            backgroundColor='brand.secondary'
            color='brand.greenishGray'
            h='40px'
            w='100px'
            px='0px'
            onClick={handleAddPreference}>
            Add new
          </Button>
        </Flex>
        <Divider borderWidth="1px" borderColor="#000" />
        <Accordion allowToggle reduceMotion>
          {
            preferences.map((preference) =>
              <PreferencesAccordion key={preference.id}
                id={preference.id}
                name={preference.name} 
                wanted={preference.wanted}
                unwanted={preference.unwanted}
                onDelete={handleDeletePreference}/>)
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
        </Flex>
      </Flex>
      <PreferenceModal isOpen={isOpen} onClose={onClose} onAdd={handleNewPreference} />
    </Flex>
  );
};
