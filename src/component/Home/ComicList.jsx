import { Flex, Container, Wrap, WrapItem, Box, Image, Heading, HStack, Badge, Button, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ComicSlice } from '../../store/ComicReducer/context'
import { Link } from 'react-router-dom'
import HomeSkeletion from '../Skeleton/HomeSkeletion'
import Banner from '../Banners/Banner'

const ComicList = () => {

    //colors
    const color = useColorModeValue("teal", "white")
    const bg = useColorModeValue("gray.100", "blue.800")

    //context and state
    const ComicConsumer = useContext(ComicSlice)
    const [ width, setWidth ] = useState(window.innerWidth)
    const [ loadSkeletion, setLoadSkeletion ] = useState(true)

    //skeleton effect
    useEffect(() => {
        setInterval(() => {
            setLoadSkeletion(false)
        }, 2000)

        return () => {
            console.log("cancel load skeleton")
        }
    }, [])

    const { comics, toggleComic, limitData } = ComicConsumer
    const reversedComic = comics.comic.reverse()
    
    //resizing effect
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })

        return () => console.log("clean resize effect")
    }, [width])

    return (
        <div>
            <Container maxW = "container.lg" mt = "30px">
            <Banner isLoading={loadSkeletion}/>
            <Heading fontSize={"100px"} mt = "50px" color = "teal.200">New Comic</Heading>
                {
                    loadSkeletion && <HomeSkeletion
                        width = { width < 500 ? "160px" : "232px"}
                        loaded = {false}
                    />
                }
                <Wrap mt = "30px">
                { reversedComic.map(item => {
                    return (
                        (loadSkeletion === false) ? <WrapItem>
                                <Box key={item._id} ml = "1px" ga- _hover={{
                                    boxShadow: "xl"
                                    }} rounded={"10px"} w = { width < 500 ? "174px" : "240px"} h = "440px" bg = {bg}>
                                    <Image src = {item.backgroundImage} w = {width < 500 ? "200px" : "280px"} h = "300px"></Image>
                                    <Box ml = "5px" mt = "5px">
                                        <HStack>
                                            <Badge colorScheme={"red"}>New</Badge>
                                            <Heading isTruncated color = {color} fontWeight={"bold"} size = "sm">{item.title}</Heading>
                                        </HStack>
                                        <Box>
                                            <Text color = {color} ml = "10px" mt = "10px">Newest eps: {item.eps[item.eps.length - 1].epsNum}</Text>
                                        </Box>
                                        <Box ml = "10px" mt="10px">
                                          <Text>View: {item.views}</Text>
                                        </Box>
                                        <Button ml = "10px" mt = "15px" variant={"link"} colorScheme = "teal"><Link to = {`/comic/${item._id}`}>Read</Link></Button>
                                    </Box>
                                </Box>
                        </WrapItem> : ""
                    )
                })}
                </Wrap>
                <Flex justify={"center"}>
                    { (limitData <= comics.comic.length) ? (
                        <Button mt = "20px" variant={"link"} onClick={toggleComic}>Show more</Button>
                    ) : ""}
                </Flex>
            </Container>
        </div>
    )
}

export default ComicList