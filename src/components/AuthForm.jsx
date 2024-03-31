import { VStack, HStack, Input, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const AuthForm = (props) => {
// { title, onSubmit, isRegister, onEmailChange, onPassword }
    return (
        <VStack
            display="flex"
            as="form"
            onSubmit={props.onSubmit}
            h={props.isRegister ? "420px" : "390px"}
            w="480px"
            bg="brand.secondary"
            borderRadius={40}
            padding="70px"
            paddingTop={props.isRegister ? "50px" : "70px"}
            spacing="20px">
            <Text
                fontFamily="Playfair Display"
                fontWeight={900}
                fontSize={40}
                alignSelf="start"
                color="brand.greenishGray">
                {props.title}
            </Text>
            <Input
                background="brand.background"
                placeholder="Email"
                width="90%" 
                value={props.emailValue}
                onChange={props.onEmailChange}/>
                
            <Input
                background="brand.background"
                placeholder="Password"
                width="90%"
                type="password" 
                value={props.passwordValue}
                onChange={props.onPasswordChange}/>
            {props.isRegister && (
                <Input
                    background="brand.background"
                    placeholder="Repeat Password"
                    width="90%"
                    type="password"
                    value={props.repeatPasswordValue}
                    onChange={props.onRepeatPasswordChange}/>
            )}

            <HStack justify={"end"} w="100%" spacing="5%">
                {props.isRegister && (
                    <Link to="/login">
                        <Button variant="link" color="brand.greenishGray">
                            Already got an account?
                        </Button>
                    </Link>
                )}
                <Button alignSelf={"end"} size="md" type="submit">
                    {props.isRegister ? "Register" : "Login"}
                </Button>
            </HStack>
        </VStack>
    )
}