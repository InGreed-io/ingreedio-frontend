import { Button, AccordionButton, Text, AccordionItem, AccordionPanel, Divider, Flex, useToast } from "@chakra-ui/react";
import { apiDelete, apiPatch } from "../../utils/api";
import { AsyncSelect } from "chakra-react-select";
import { useState, useEffect } from "react";
import { apiGet } from "../../utils/api";
import { Ingredient } from "./Ingredient";

export const PreferencesAccordion = ({ id, name, wanted, unwanted, onDelete }) => {

  const toast = useToast();
  const [preferredIngredients, setPreferredIngredients] = useState(wanted);
  const [prohibitedIngredients, setProhibitedIngredients] = useState(unwanted);
  const [ingredients, setIngredients] = useState([]);
  const preferredQuery = "";
  const prohibitedQuery = "";

  const handleAddIngredient = (ingr, isWanted) => {
    apiPatch(`Preferences/${id}`, { id: ingr.value, isWanted: isWanted })
      .then(() => {
        if (isWanted) {
          setPreferredIngredients([...preferredIngredients, { id: ingr.value, name: ingr.label }]);
        } else {
          setProhibitedIngredients([...prohibitedIngredients, { id: ingr.value, name: ingr.label }]);
        }
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "Error adding ingredient.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDeleteIngredient = (ingr, isWanted) => {
    apiPatch(`Preferences/${id}/ingredients/${ingr.id}/delete`)
      .then(() => {
        if (isWanted) {
          setPreferredIngredients(preferredIngredients.filter(i => i.id !== ingr.id));
        } else {
          setProhibitedIngredients(prohibitedIngredients.filter(i => i.id !== ingr.id));
        }
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "Error deleting ingredient.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    apiGet("ingredients", {
      query: "",
      pageIndex: 0,
      pageSize: 5,
      exclude: preferredIngredients.map(i => i.id).concat(prohibitedIngredients.map(i => i.id)),
    })
      .then((body) => {
        setIngredients(body.contents.map(({ id, name }) => ({ value: id, label: name })));
        console.log("use efect");
      });
  },[preferredIngredients, prohibitedIngredients]);

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
          <Text>{name}</Text>
        </AccordionButton>
        <Button
          mr='10px'
          variant="secondary"
          alignSelf="center"
          h='27px'
          w='88px'
          onClick={() => {
            apiDelete(`Preferences/${id}`)
              .then(() => onDelete(id))
              .catch(() => {
                toast({
                  title: "Error.",
                  description: "Error deleting preference.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              });
          }}>
          Delete
        </Button>

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
          minH="200px"
          mt='-2em'
          pt='2em'
          pb='1em'>
          <Flex w="100%" pl='1em' pr='1em' flexDirection='column' justify='space-between'>
            <Text>Preferred ingredients</Text>
            <Flex dir="column" flexWrap="wrap">
              {
                preferredIngredients.map((ingr) =>
                  <Ingredient key={ingr.id} name={ingr.name} wanted={true} onDelete={() => handleDeleteIngredient(ingr, true)} />)
              }
            </Flex>
            <AsyncSelect
              placeholder="Add preferred ingredient"
              size='sm'
              name='Preferred'
              variant='white'
              value={preferredQuery}
              onChange={(ingr) => {
                handleAddIngredient(ingr, true);
              }}
              loadOptions={
                (inputValue, callback) => {
                  apiGet("ingredients", {
                    query: inputValue,
                    pageIndex: 0,
                    pageSize: 5,
                    exclude: preferredIngredients.map(i => i.id).concat(prohibitedIngredients.map(i => i.id)),
                  })
                    .then(items => {
                      items = items.contents.map(({ id, name }) => ({ value: id, label: name }));
                      callback(items);
                    });
                }
              }
              defaultOptions={ingredients} />
          </Flex>
          <Divider h='95%' orientation="vertical" borderWidth="1px" borderColor='brand.greenishGray'></Divider>
          <Flex w="100%" pl='1em' pr='1em' flexDirection='column' justify='space-between'>
            <Text w='100%'>Prohibited ingredients</Text>
            <Flex dir="column" flexWrap="wrap">
              {
                prohibitedIngredients.map((ingr) =>
                  <Ingredient key={ingr.id} name={ingr.name} wanted={false} onDelete={() => handleDeleteIngredient(ingr, false)} />)
              }
            </Flex>
            <AsyncSelect
              position='relative'
              zIndex='5'
              placeholder="Add prohibited ingredient"
              size='sm'
              name='Prohibited'
              variant='white'
              value={prohibitedQuery}
              onChange={(ingr) => {
                handleAddIngredient(ingr, false);
              }}
              loadOptions={
                (inputValue, callback) => {
                  apiGet("ingredients", {
                    query: inputValue,
                    pageIndex: 0,
                    pageSize: 5,
                    exclude: preferredIngredients.map(i => i.id).concat(prohibitedIngredients.map(i => i.id)),
                  })
                    .then(items => {
                      items = items.contents.map(({ id, name }) => ({ value: id, label: name }));
                      callback(items);
                    });
                }
              }
              defaultOptions={ingredients}
              chakraStyles={{
                menuList: (provided) => ({
                  ...provided,
                  position: "relative",
                  zIndex: "5"
                })
              }} />
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};