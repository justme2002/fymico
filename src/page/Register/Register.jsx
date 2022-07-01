import { useColorModeValue, Container, Box, FormControl, FormLabel, Heading, Image, Input, Button, FormHelperText, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios'


const Register = () => {

    const bg = useColorModeValue("white", "blue.800")
    const color = useColorModeValue("teal", "white")

    const [ account, setAccount ] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    const { username, password, confirmPassword, email } = account

    let [ showPass, setShowPass ] = useState({
        isPasswordShow: true,
        isPasswordConfirmationShow: true
    })

    const [ showHelperText, setShowHelperText ] = useState({
        requireMaximumLength: false,
        requireSameValue: false
    })

    const { requireMaximumLength, requireSameValue } = showHelperText

    const showPassHandler = () => {
        setShowPass({...showPass, isPasswordShow: !showPass.isPasswordShow})
    }
    const showPassConfirmHandler = () => {
        setShowPass({...showPass, isPasswordConfirmationShow: !showPass.isPasswordConfirmationShow})
    }

    const usernameHandler = (event) => {
        setAccount({...account, username: event.target.value})
    }
    const passwordHandler = (event) => {
        setAccount({...account, password: event.target.value})
        if(event.target.value < 8) {
            setShowHelperText({...showHelperText, requireMaximumLength: true})
        } else {
            setShowHelperText({...showHelperText, requireMaximumLength: false})
        }
    }
    const passwordConfirmationHandler = (event) => {
        setAccount({...account, confirmPassword: event.target.value})
        if (confirmPassword === password){
            setShowHelperText({...showHelperText, requireSameValue: true})
        } else {
            setShowHelperText({...showHelperText, requireSameValue: false})
        }
        
    }
    const emailHandler = (event) => {
        setAccount({...account, email: event.target.value})
    }

    const signupHandler = async (event) => {
        event.preventDefault();
        
        await axios.post("https://comify-auth.herokuapp.com/api/auth/store", {
            username: username,
            password: password,
            email: email
        })
    }



    return (
        <div>
            <Image position={"absolute"} zIndex = {1}  src = "https://buffer.com/library/content/images/library/wp-content/uploads/2016/06/giphy.gif" h={"980px"} w = {"1900px"}></Image>
            <Container position = {"absolute"} zIndex = {2} >
                <Box bg = {bg} rounded={"10px"} h = "800px" mt = "20px">
                    <Box mt = "15px" ml = "8px">
                        <Heading color = {color}>Register</Heading>
                        <Box mt = "20px">
                            <form onSubmit={signupHandler}>
                                <FormControl>
                                    <FormLabel color = {color}>username</FormLabel>
                                    <Input value = {username} onChange = {usernameHandler} placeholder='username...' w = "95%" required/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel color = {color}>password</FormLabel>
                                        <InputGroup>
                                            <Input borderColor={requireMaximumLength === false ? "gray.200" : "red"} value = {password} onChange = {passwordHandler} type = {showPass.isPasswordShow === true ? "password" : "text"} placeholder='password...'  w = "95%" required />
                                            <InputRightElement mr = "18px"><IconButton onClick={showPassHandler} icon = {showPass.isPasswordShow === false ? <ViewIcon /> : <ViewOffIcon />} /></InputRightElement>
                                        </InputGroup>
                                        {  requireMaximumLength && (<FormHelperText color = "red">Require value higher than 8</FormHelperText> )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel color = {color}>confirm password</FormLabel>
                                        <InputGroup>
                                            <Input value = {confirmPassword} onChange = {passwordConfirmationHandler} type = {showPass.isPasswordConfirmationShow === true ? "password" : "text"} placeholder='confirm password...' required  w = "95%"/>
                                            <InputRightElement  mr = "18px"><IconButton onClick={showPassConfirmHandler} icon = {showPass.isPasswordConfirmationShow === false ? <ViewIcon /> : <ViewOffIcon />} /></InputRightElement>
                                        </InputGroup>
                                        {  requireSameValue && (<FormHelperText color = "red">not the same password</FormHelperText> )}
                                </FormControl>
                                <FormControl>
                                    <FormLabel color = {color}>email</FormLabel>
                                    <Input type = "email" value = {email} onChange = {emailHandler} placeholder='email...'  w = "95%" required/>
                                </FormControl>
                                <Box mt = "15px">
                                    <Button colorScheme={"teal"} type = "submit">Sign up</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Register