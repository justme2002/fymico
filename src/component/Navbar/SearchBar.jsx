import { Input, Box, Button, Text, Heading, useColorModeValue, HStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import axios  from 'axios'
import { SearchInputSlice } from '../../store/SearchInput/context'
// import { ComicSlice } from '../../store/ComicReducer/context'

const SearchBar = ({ onClose }) => {

    const color = useColorModeValue("teal", "white")
    const bg = useColorModeValue("gray.100", "blue.800")

    const [ isResultBoxShow, setIsResultBoxShow ] = useState(false)
    // const [ searchInput, setSearchInput ] = useState("")
    const [ allComic, setAllComic ] = useState([])

    //using searchInput slice from store

    const { inputText, inputChange } = useContext(SearchInputSlice)
    console.log(inputText)

    //fetching data from server

    useEffect(() => {
        const getComic = async () => {
            try {
                const response = await axios.get("https://evening-atoll-90051.herokuapp.com/comic")
                setAllComic(response.data.comic)
            } catch (error) {   
                console.log(error)
            }
        }

        getComic()

        return () => setAllComic()
    }, [])

    // const { comics, allComic } = useContext(ComicSlice)

    let result = allComic.filter(com => com.title.toLowerCase().indexOf(inputText.toLowerCase()) !== -1)

    useEffect(() => {
        if(inputText !== "") {
            setIsResultBoxShow(true)
        } else {
            setIsResultBoxShow(false)
        }
        return () => console.log("clean search effect")

    }, [inputText])



    return (
        <div>
            <Box postion = {"absolute"} zIndex = {1}>
                <form>
                    <HStack>
                        <Input placeholder='search...' value = {inputText} onChange = {inputChange}/>
                        <Button>
                            <Link to = {`/search/result`}>Search</Link>
                        </Button>
                    </HStack>                    
                </form>
            </Box>
            { isResultBoxShow && <Box position={"absolute"} w = "88%" zIndex = {2} bg = {bg} h = "500px" rounded = "2px" mt = "5px">
                <div>
                    <Box>
                        <Heading color = {color} mt = "10px" ml = "10px" size = "sm">Result: </Heading>
                        <div>
                            <Text style = {{ margin: "10px 20px"}} position = "absolute" zIndex = {3}>
                            {result.map(comic => (
                                <div>  
                                    <li style = {{ listStyleType: "none" }}>
                                        <Button mt = "10px" colorScheme= {"color"} onClick = {onClose} variant = "link"><Link to = {`/comic/${comic._id}`}>{comic.title}</Link></Button>
                                    </li>
                                </div>
                            ))}
                            </Text>
                        </div>
                    </Box>
                </div>
            </Box>}
        </div>
    )
}

export default SearchBar