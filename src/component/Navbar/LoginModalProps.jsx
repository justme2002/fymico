import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginModalProps = ({ isOpen, onClose }) => {


    const [ account, setAccount ] = useState({
        username: "",
        password: ""
    })

    const { username, password } = account

    const loginEventHander = async (url) => {
        const response = await axios.post(url, {
            username: username,
            password: password
        })
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken))
        onClose()

        window.location.reload()
    }
    
    return (
        <div>
            <Modal isOpen = {isOpen} onClose = {isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick = {onClose} />
                    <ModalHeader>Sign in</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormControl>
                                <FormLabel aria-label='username'>username</FormLabel>
                                <Input placeholder = "username" name = "username" value = {username} onChange = {(event) => setAccount({...account, username: event.target.value})}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel aria-label='password'>password</FormLabel>
                                <Input placeholder = "password" type = "password" name = "password" value = {password} onChange = {(event) => setAccount({...account, password: event.target.value})}/>
                            </FormControl>
                            <HStack mt = "10px">
                                <Box mt = "10px">
                                    <Button variant = "link" colorScheme = "orange"><Link to = "/forgot-password">Forgot-password ?</Link></Button>
                                </Box>
                                <Spacer />
                                <Box mt = "10px">
                                    <Button variant = "link"  colorScheme = "blue" onClick = {onClose}><Link to = "/register">Sign up</Link></Button>
                                </Box>
                            </HStack>
                            <FormControl>
                                <Button onClick = {loginEventHander.bind(this, "https://comify-auth.herokuapp.com/api/auth/verify")} mt = "10px" colorScheme = "teal">Login</Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LoginModalProps