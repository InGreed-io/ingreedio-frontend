import {AbsoluteCenter, Box} from '@chakra-ui/react';
import { NavigationBar } from '../components/NavigationBar';
import { AuthForm } from '../components/AuthForm';
import { useState } from 'react';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = (event) => {
        // api register logic
        event.preventDefault();
        console.log("Register form!")
        console.log("Email: " + email);
        console.log("Password: " + password);
        console.log("Repeat password: " + repeatPassword);
    };

    return(
        <>
        <NavigationBar />
        <AbsoluteCenter display={"flex"}>

            {/* Background rectangles*/}
            <Box 
            bg="brand.primary"  
            zIndex={-1} 
            position={"absolute"}
            transform="translate(40%,-30%)" 
            w="380px" h="150px" 
            borderRadius={50} />
            <Box bg="brand.primary"  
            zIndex={-1} 
            position={"absolute"}
            transform="translate(-15%,210%)" 
            w="380px" h="150px" 
            borderRadius={50}/>

            {/* Form */}
            <AuthForm 
            title="Register" 
            onSubmit={handleSubmit} 
            isRegister
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onRepeatPasswordChange={(e) => setRepeatPassword(e.target.value)}
            emailValue={email}
            passwordValue={password}
            repeatPasswordValue={repeatPassword}/>

        </AbsoluteCenter>
        </>
    )
}