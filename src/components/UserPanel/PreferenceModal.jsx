import { useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, Input,
  useToast
} from "@chakra-ui/react";
import { apiPost } from "../../utils/api";

export const PreferenceModal = ({ isOpen, onClose, onAdd }) => {
  const [preferenceName, setPreferenceName] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    apiPost("User/preferences", { name: preferenceName })
      .then((body) => {
        onAdd(body);
        setPreferenceName("");
        onClose();
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} width='unset' size='xs'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter preference name</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Preference name"
            value={preferenceName}
            onChange={(e) => setPreferenceName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
