import React from 'react'
import { Center, Container, Image, Text, VStack } from '@chakra-ui/react'

const NotFound = () => {
  return (
    <div>
        <Container maxW= "container.xl">
            <Center>
                <VStack>
                    <Image src = "/error404-404.gif" w = "600px "/>
                    <Text fontSize = "lg">404 Not found</Text>
                </VStack>
            </Center>
        </Container>
    </div>
  )
}

export default NotFound