import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box, Flex, Text, Image, Stack, Button, Center, Spinner,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure,
  FormControl, FormLabel,
  Textarea
} from "@chakra-ui/react";
import { IngredientBox } from "./IngredientBox";
import { ReviewBox } from "./ReviewBox";
import { ReviewModal } from "./ReviewModal";
import { StaticRating } from "./Rating";
import { useState } from "react";
import { AsyncSelect } from "chakra-react-select";

export const ProductDetails = ({ product, reviews, prev, next, page, maxPage, setPageResetted, isEditable = false }) => {
  if (!product) return <Center><Spinner /></Center>;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState(product);
  const [newTitle, setNewTitle] = useState(product?.name || "");
  const [newDesc, setNewDesc] = useState(product?.description || "");

  const handleDeleteIngredient = (ingrId) => {
    const updatedIngredients = details.ingredients.filter(ingr => ingr !== ingrId);
    console.log(updatedIngredients);
    setDetails(prevDetails => ({
      ...prevDetails,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {

  };

  const handleChangeTitleAndDesc = () => {
    onOpen();
  };

  const handleUpdateDetails = () => {
    console.log("Updated Title:", newTitle);
    console.log("Updated Description:", newDesc);
    // update logic here
    onClose();
  };

  return (
    <Flex
      align="start"
      justifyContent="start"
      flexDirection="column"
      flexWrap="wrap">
      <Flex flexDirection="row"
        justifyContent="center"
        flexWrap={"wrap"}>
        <Image src={details.iconUrl}
          borderRadius={25}
          w="400px"
          margin="40px"
          boxShadow="4px 4px 20px rgba(0, 0, 0, 0.25)" />
        <Flex flexDirection="column"
          justify="start"
          gap={5}
          textAlign="start"
          paddingTop="40px"
          flexShrink={1}>
          <Text
            fontFamily="Playfair Display"
            color="#000000"
            fontWeight={900}
            fontSize={36}>
            {details.name}
          </Text>
          <Text
            fontFamily="Inter"
            color="brand.greenishGray"
            fontWeight={100}
            fontSize={24}
            textDecoration="underline">
            {details.companyName}
          </Text>
          <Flex alignItems={"center"} gap={5}>
            <StaticRating rating={product.rating} size={{ base: 8, sm: 10 }} />
            <Text fontSize={30}>({product.ratingsCount})</Text>
          </Flex>
          <Box maxW={800}>
            <Text
              fontFamily="Inter"
              color="brand.greenishGray"
              fontWeight={300}
              fontSize={24}>
              {details.description}
            </Text>
          </Box>
        </Flex>
      </Flex>
      {isEditable ?
        <Flex w='100%' flexDir='row' justifyContent='end'>
          <Button onClick={handleChangeTitleAndDesc}>Edit product details...</Button>
        </Flex>
        : undefined}
      <Text
        fontFamily="Playfair Display"
        color="brand.primary"
        fontWeight={900}
        fontSize={36}>
        Ingredients:
      </Text>

      <Flex
        flexWrap="wrap"
        alignContent='center'>
        {details.ingredients ? (details.ingredients.map((p, index) => <IngredientBox key={index} name={p} isEditable={isEditable} onDelete={handleDeleteIngredient} />)) : ""}
        {isEditable ?
          <AsyncSelect
            placeholder='New ingredient..'
            onChange={handleAddIngredient}
          ></AsyncSelect>
          : undefined}
      </Flex>
      <Text
        fontFamily="Playfair Display"
        color="brand.primary"
        fontWeight={900}
        fontSize={36}
        margin="25px"
        marginLeft="0px">
        Reviews:
      </Text>
      <ReviewModal productId={details.id} setPageResetted={setPageResetted} />
      <Stack width={"100%"}>
        <Flex
          flexDirection="row"
          justifyContent={"center"}
          gap={{ base: 0, md: 10 }}
          flexWrap="wrap">
          {reviews?.length > 0 ?
            reviews.map((review) => <ReviewBox key={review.id} id={review.id} name={review.username} content={review.text} rating={review.rating} />)
            :
            <Text>You can be first to review this product!</Text>}
        </Flex>
        <Flex
          justifyContent={"center"}
          gap={5}
          alignItems={"center"}>
          <Button
            size={"md"}
            isDisabled={page === 0}
            onClick={prev}
          ><ChevronLeftIcon fontSize={"lg"} /></Button>
          <Text>
            {page}
          </Text>
          <Button
            isDisabled={page === maxPage}
            onClick={next}
            size={"md"}><ChevronRightIcon fontSize={"lg"} /></Button>
        </Flex>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily='PlayFair Display'>Edit Product Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display='flex' flexDirection='column'>
              <FormLabel fontFamily='Playfair Display' fontWeight='900'>Title</FormLabel>
              <Input
                placeholder="New Title..."
                variant='secondary'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                mb={3}
              />
              <FormLabel fontFamily='Playfair Display' fontWeight='900'>Description</FormLabel>
              <Textarea
                p='1em'
                fontFamily='Inter'
                alignContent='start'
                borderWidth='2px'
                borderRadius='30'
                bg='brand.background'
                borderColor='brand.primary'
                h='400px'
                textAlign='start'
                variant='secondary'
                placeholder="New Description..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button mx={3} onClick={handleUpdateDetails}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
