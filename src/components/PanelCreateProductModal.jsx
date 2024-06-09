import { useEffect, useState, useCallback } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { apiPostWithFormData, apiGet, mapToSelectObject } from "../utils/api";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { SingleSelect } from "./SingleSelect";
import { AsyncMultiSelect } from "./AsyncMultiSelect";
import { useOutletContext } from "react-router-dom";

const fetchData = async (endpoint, params, callback, setError) => {
  try {
    const data = await apiGet(endpoint, params);
    callback(data);
  } catch {
    setError("Failed to fetch data");
  }
};

export const PanelCreateProductModal = ({ setPageResetted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [category, setCategory] = useState(undefined);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const { role } = useOutletContext();

  const onDrop = (acceptedFiles, rejectedFiles) => {
    setError("");
    if (rejectedFiles.length > 0) {
      setError("File must be an image and less than 1MB");
    } else {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxSize: 1048576, // 1MB
    onDrop,
  });

  const fetchCategories = useCallback(() => {
    fetchData("categories", {}, data => setCategories(mapToSelectObject(data)), setError);
  }, []);

  const fetchIngredients = useCallback((excludedIngredientIds) => {
    fetchData("ingredients", { pageIndex: 0, pageSize: 5, exclude: excludedIngredientIds }, data => setIngredients(mapToSelectObject(data.contents)), setError);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchIngredients(selectedIngredients.map(i => i.value));
    }
  }, [isOpen, fetchCategories, fetchIngredients, selectedIngredients]);

  const handleCreate = async () => {
    setError("");

    if (!file) {
      setError("Please upload an image");
      return;
    }
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }
    if (!category) {
      setError("Please select the category of your product");
      return;
    }
    if (title.length === 0) {
      setError("Please fill the title");
      return;
    }
    if (description.length === 0) {
      setError("Please fill a description");
      return;
    }

    const data = {
      name: title,
      description,
      ingredients: selectedIngredients.map(i => i.value),
      categoryId: category.value,
      photo: file,
    };

    try {
      await apiPostWithFormData("panel/products", data);
      toast({
        title: "Success",
        description: "Product has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
      onClose();
    } catch {
      toast({
        title: "Failure",
        description: "Cannot create a product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setError("Failed to create product");
    }
  };

  const resetForm = () => {
    setSelectedIngredients([]);
    setCategory(undefined);
    setTitle("");
    setDescription("");
    setFile(null);
    setPageResetted(b => !b);
  };

  if(role === "Moderator") return null;
  return (
    <>
      <Button onClick={onOpen} paddingX={6} alignSelf={"flex-end"} mr={5}>Create New Product</Button>
      <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} gap={4} flexDir={"column"}>
            <FormControl isRequired>
              <FormLabel fontFamily={"Playfair Display"}>Title</FormLabel>
              <Input
                w={"100%"}
                variant={"secondary"}
                name={"title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontFamily={"Playfair Display"}>Category</FormLabel>
              <SingleSelect
                controlProps={{ bg: "brand.background", borderWidth: 2, borderColor: "brand.primary" }}
                name={"categoryId"}
                onChange={setCategory}
                options={categories}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontFamily={"Playfair Display"}>Description</FormLabel>
              <Textarea
                maxLength={500}
                bg={"brand.background"}
                borderColor={"brand.primary"}
                borderWidth={2}
                name={"description"}
                borderRadius={25}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description..."
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontFamily={"Playfair Display"}>Ingredients</FormLabel>
              <AsyncMultiSelect
                controlProps={{ bg: "brand.background", borderWidth: 2, borderColor: "brand.primary" }}
                name="ingredients"
                placeholder="Ingredients..."
                value={selectedIngredients}
                onChange={setSelectedIngredients}
                loadOptions={(inputValue, callback) => {
                  apiGet("ingredients", {
                    query: inputValue,
                    pageIndex: 0,
                    pageSize: 5,
                    exclude: selectedIngredients.map(i => i.value),
                  })
                    .then(items => {
                      items = mapToSelectObject(items.contents).concat(selectedIngredients);
                      callback(items);
                    });
                }}
                defaultOptions={ingredients}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontFamily={"Playfair Display"}>Photo</FormLabel>
              <Box
                {...getRootProps()}
                borderRadius={25}
                bg={"brand.background"}
                borderColor={"brand.primary"}
                borderWidth={2}
                borderStyle={"dashed"}
                p={4}
                textAlign="center"
                cursor="pointer"
              >
                <Input {...getInputProps()} />
                <Flex justifyContent="center" alignItems={"center"}>
                  <UploadFileIcon fontSize={"large"} />
                  {file ? (
                    <Text>{file.name}</Text>
                  ) : (
                    <Text>Drag or Click to browse files</Text>
                  )}
                </Flex>
              </Box>
              {error && <Text color="red.500">{error}</Text>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button colorScheme="green" onClick={handleCreate}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

