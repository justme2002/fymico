import React, { useEffect, useState } from 'react'
import { Container, Flex, Box, Heading, Spacer, IconButton, HStack, Button, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { VscMenu } from 'react-icons/vsc'
import MenuDrawerProps from './MenuDrawerProps'

const Navbar = () => {

    //state
    let [ resizeNav, setResizeNav ] = useState(window.screen.width)

    //resizing effect
    useEffect(() => {
        window.addEventListener("resize", () => {
            setResizeNav(window.screen.width)
            
        })
        return () => {
            console.log("clear event")
        }
    }, [resizeNav])


    //chakraUI disclosure hook
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <div>
            <Container maxW = "container.xl" height = "100px">
                <Flex>
                    <Box>
                        <Heading bgClip='text' size = "xl" fontWeight = "bold" bgGradient={"linear(to-r, pink.200, green.500)"}>
                            <Link to = "/">ComiFy</Link>
                        </Heading>
                    </Box>
                    <Spacer />
                    { (resizeNav > 500) ? <HStack gap = "30px">
                        <Button variant={"link"}><Link to = "/">Home</Link></Button>
                        <Button variant={"link"}><Link to = "/about">About</Link></Button>
                        <Button variant={"link"}>Category</Button>
                    </HStack> : ""}
                    <Spacer />
                    <Box>
                        <IconButton onClick = {onOpen} icon = {<VscMenu />} />
                    </Box>
                </Flex>
            </Container>
            <MenuDrawerProps 
                isOpen = {isOpen} 
                onClose = {onClose}
            />
        </div>
    )
}

export default Navbar