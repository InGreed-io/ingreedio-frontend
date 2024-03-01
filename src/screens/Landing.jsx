import { InputGroup, Input, InputLeftElement } from "@chakra-ui/input";
export const Landing = () => {
  return (
    <>
      <p>Landing!!</p>
      <InputGroup>
        <InputLeftElement>
          Test
        </InputLeftElement>
        <Input type='text' placeholder='' />
      </InputGroup>
    </>
  );
};
