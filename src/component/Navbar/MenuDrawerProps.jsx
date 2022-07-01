import { Text, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Divider } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import CategoryProps from './CategoryProps'
import  LoginModalProps from './LoginModalProps'
import SearchBar from './SearchBar'
import { UserSlice } from '../../store/UserReducer/context'

const MenuDrawerProps = ({ isOpen, onClose, onOpen }) => {

    //state and context
    let [ isModalOpen, setModalOpen ] = useState(false)
    // let [ username, setUsername ] = useState("")
    const { user } = useContext(UserSlice)

    //test get token
    const token = localStorage.getItem("token")

    //open modal
    const setOpenModal = () => {
        setModalOpen(true)
    }
    
    //close modal
    const setCloseModal = () => {
        setModalOpen(false)
    }

    // useEffect(() => {
    //     const getUserLogged = async () => {
    //         const parsedToken = JSON.parse(localStorage.getItem("token"))

    //         const response = await axios.get("http://localhost:4000/info", {
    //             headers: {
    //                 "Authorization": `Bearer ${parsedToken.accessToken}`
    //             }
    //         })
    //         setUsername(response.data.username)
    //         console.log(username)
    //     }
    //     getUserLogged()
    // }, [username])

    //user logout
    const logoutHandler = async () => {
        const parsedToken = JSON.parse(token)
        const response = await axios.delete("http://localhost:4200/api/auth/logout", {
            headers: {
                "Authorization": `Bearer ${parsedToken.accessToken}`
            }
        })
        if(response.data.success === true) {
            localStorage.clear("token")
            localStorage.clear("refreshToken")
            window.location.reload()
        }
    }
    
    //refresh token
    if(token) {
        try {
            const refreshToken = JSON.parse(localStorage.getItem("refreshToken"))
            setInterval(async () => {
            const response = await axios.post("http://localhost:4200/api/auth/token", {
                refreshToken: refreshToken.token
            })
                localStorage.setItem("token", JSON.stringify(response.data.newToken))
            }, 10000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Drawer
                size = "md"
                isOpen = {isOpen} 
                onClose = {onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick = {onClose} />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        {(!localStorage.getItem("token")) ? <Button onClick={setOpenModal} colorScheme = "teal">Sign in</Button>
                        : (<Box>
                            <Text>Logged as {user.username}</Text>
                            <Button colorScheme={"orange"} onClick = {logoutHandler} mt = "20px">log out</Button>
                        </Box>)}
                        <Divider mt = "20px" />
                            <SearchBar onClose={onClose}/>
                        <Divider mt = "20px" />
                        <CategoryProps mt = {"20px"}/>
                    </DrawerBody>
                    <DrawerFooter color = "gray.500">
                        Comify 2021
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <LoginModalProps isOpen = {isModalOpen} onClose = {setCloseModal} />

        </div>
    )
}

export default MenuDrawerProps