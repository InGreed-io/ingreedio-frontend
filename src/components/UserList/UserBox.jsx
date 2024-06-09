import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { Person } from "@mui/icons-material";

export const UserBox = ({ user, onOpenDialog }) => {

  const role = user.role || "User";

  const roleColors = {
    "Admin": "red",
    "Moderator": "#779ECB",
    "Producer": "#FF964F",
    "default": "brand.greenishGray"
  };

  const color = roleColors[role] || roleColors["default"];

  return (
    <Flex flexDir='row'
      bg='white'
      m='1em'
      borderRadius='30'
      p='1em'
      textAlign='start'
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
      <Icon
        color='brand.greenishGray'
        boxSize='3em' as={Person} />
      <Flex flexDir='column' justify='space-between'>
        <Flex flexDir='column'>
          <Text
            fontSize='20px'
            fontWeight='900'>{user.email}</Text>
          <Text
            fontWeight='700'
            color={color}>{role}</Text>
        </Flex>
        <button onClick={() => onOpenDialog(user)}>
          <Flex flexDir='row' justifyContent='end' align='center'>
            {
              user.isBlocked ? <>
                <NotAllowedIcon color="#F08C8C" boxSize={5} />
                <Text
                  color="#F08C8C"
                  fontWeight='700'
                >Deactivated</Text> </> :
                <>
                  <CheckIcon color='brand.primary' boxSize={5} />
                  <Text
                    color="brand.primary"
                    fontWeight='700'
                  >Active</Text>
                </>
            }
          </Flex>
        </button>
      </Flex>
    </Flex>
  );
};