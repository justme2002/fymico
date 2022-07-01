import { Box, Container, FormControl, Input, Text, Image, HStack, Badge, Heading, Button, WrapItem, Wrap } from '@chakra-ui/react'
import React, { useEffect, useState, useContext } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { SearchInputSlice } from '../../store/SearchInput/context'
// import { ComicSlice } from '../../store/ComicReducer/context'

const SearchResult = () => {

    //take out params
    // const params = useParams()
    const { inputText, inputChange } = useContext(SearchInputSlice)
    console.log(inputText)

    //State
    // const [ input, setInput ] = useState("")
    const [ comics, setComics ] = useState([])
    const [ width, setWidth ] = useState(window.innerWidth)


    // const textInputHandler = (event) => {
    //     setInput(event.target.value)
    // }

    //fetching comic data after giving search keyword
    useEffect(() => {
        const getComics = async () => {
            const res = await axios.get("https://evening-atoll-90051.herokuapp.com/comic")
            setComics(res.data.comic.filter(comic => comic.title.toLowerCase().indexOf(inputText.toLowerCase()) !== -1))
        }
        getComics()

        return () => console.log("clear search effect")
    }, [inputText])

    //screen box resizing

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })

        return () => console.log("clean resize effect")
    }, [width])

    //color
    const color = useColorModeValue("teal", "white")
    const bg = useColorModeValue("gray.100", "blue.800")


    console.log(comics)
    
    return (
        <Container maxW = "container.lg">
            <Box>
                <form onSubmit = {(event) => event.preventDefault()}>
                    <FormControl>
                        <Input 
                            placeholder='search...'
                            value = {inputText}
                            onChange = {inputChange}
                        />
                    </FormControl>
                </form> 
            </Box> 
            <Box mt = "20px">
                <Text 
                    fontWeight={"bold"}
                    fontSize={"20px"}
                >Search result: {comics.length} result
                </Text> 
            </Box> 
            <Wrap mt = "10px">
            {comics.map(comic => (
                <WrapItem>
                    <Box key={comic._id} ml = "1px" ga- _hover={{
                        boxShadow: "xl"
                        }} rounded={"10px"} w = { width < 500 ? "174px" : "240px"} h = "440px" bg = {bg}>
                        <Image src = {comic.backgroundImage} w = {width < 500 ? "200px" : "280px"} h = "300px"></Image>
                            <Box ml = "5px" mt = "5px">
                                <HStack>
                                    <Badge colorScheme={"red"}>New</Badge>
                                    <Heading isTruncated color = {color} fontWeight={"bold"} size = "sm">{comic.title}</Heading>
                                </HStack>
                                <Box>
                                    <Text color = {color} ml = "10px" mt = "10px">Newest eps: {comic.eps[comic.eps.length - 1].epsNum}</Text>
                                </Box>
                                    <Button ml = "10px" mt = "50px" variant={"link"} colorScheme = "teal"><Link to = {`/comic/${comic._id}`}>Read</Link></Button>
                                </Box>
                            </Box>
                </WrapItem>
            ))}
            </Wrap>
        </Container>
    )
}

export default SearchResult