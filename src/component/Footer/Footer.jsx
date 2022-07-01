import React from 'react'
import { Box, Divider, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import { BsFacebook } from 'react-icons/bs'
import { SiGmail } from 'react-icons/si'
import { GrGithub } from 'react-icons/gr'

const Footer = () => {
    return (
        <div>
            <Box bg = "teal" h = "400px" w = "100%" mt = "350px">
                <Heading fontSize={"100px"} color = "white" fontWeight={"bold"}>
                    ComiFy
                </Heading>
                <Divider mt = "20px" color = "white" />
                <Flex>
                    <Spacer />
                    <Box mr = "20px" color = "white">
                        <HStack><BsFacebook/><Text>/dochetnhe1</Text></HStack>
                    </Box>
                    <Box mr = "20px" color = "white">
                        <HStack><SiGmail /><Text>/dochetnhe1</Text></HStack>
                    </Box>
                    <Box mr = "20px" color = "white">
                        <HStack><GrGithub /><Text>/justme2002</Text></HStack>
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}

export default Footer