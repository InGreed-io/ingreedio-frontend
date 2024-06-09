import usePagination from "../hooks/usePagination";
import { useState, useRef } from "react";
import { Flex, Button, Text, useToast, Input, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { apiPatch } from "../utils/api";
import { UserBox } from "../components/UserList/UserBox";


export const PanelUsersListing = () => {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState({ emailQuery: "" });
  const [next, prev, page, maxPage] = usePagination("Panel/users", (contents) => setUsers(contents), query, 0, 8);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const onClose = () => setIsDialogOpen(false);
  const cancelRef = useRef();

  const handleToggleActive = (userId, isDeactivated) => {
    const endpoint = `Panel/users/${userId}/${isDeactivated ? "activate" : "deactivate"}`;
    apiPatch(endpoint)
      .then(() => {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, isBlocked: !isDeactivated } : user
        ));
        toast({
          title: isDeactivated ? "User activated" : "User deactivated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "There was an error updating the user status",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    onClose();
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <Flex flexDirection='column' justifyContent='center'>
      <Input
        m='1em'
        justifySelf='center'
        mx='10%'
        placeholder="Search email..."
        value={query.emailQuery}
        onChange={(e) => setQuery({ emailQuery: e.target.value })}>
      </Input>
      <Flex flexDirection='row' flexWrap='wrap'>
        {
          users.map(user => (
            <UserBox key={user.id} user={user} onOpenDialog={handleOpenDialog} />
          ))
        }
      </Flex>
      <Flex
        justifyContent={"center"}
        gap={5}
        alignItems={"center"}>
        <Button
          size={"md"}
          isDisabled={page === 0}
          onClick={prev}
        >Prev</Button>
        <Text>
          {page}
        </Text>
        <Button
          isDisabled={page === maxPage}
          onClick={next}
          size={"md"}>Next</Button>
      </Flex>

      {selectedUser && (
        <AlertDialog
          isOpen={isDialogOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {selectedUser.isBlocked ? "Activate User" : "Deactivate User"}
              </AlertDialogHeader>

              <AlertDialogBody>
                                Are you sure you want to {selectedUser.isBlocked ? "activate" : "deactivate"} {selectedUser.email}?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button bg="#F08C8C" onClick={() => handleToggleActive(selectedUser.id, selectedUser.isBlocked)} ml={3}>
                  {selectedUser.isBlocked ? "Activate" : "Deactivate"}
                </Button>
                <Button variant='ghost' ref={cancelRef} onClick={onClose}>
                                    Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Flex>
  );
};
