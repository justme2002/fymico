import { Container, Heading, Box, Image, Text, Button, Center, Input, FormControl, HStack, Circle, FormHelperText, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState, useContext, } from 'react'
import { Link } from 'react-router-dom'
import  axios  from 'axios'
import { ComicDetailContext } from '../../store/ComicDetailReducer/context'
import { UserSlice } from '../.././store/UserReducer/context'

const ComicDetail = () => {


    const boxBg = useColorModeValue("gray.200", "blue.800")


    let [ width, setWidth ] = useState(window.innerWidth)
    let [ comment, setComment ] = useState("")


    const userConsumer = useContext(UserSlice)
    const { user } = userConsumer

    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 0
        })

        return () => console.log("clear scroll effect")
    }, [])
    
    useEffect(() => {
        const event = window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })

        return () => window.removeEventListener("resize", event)
    }, [width])


    let ComicContextConsumer = useContext(ComicDetailContext)
    let { comicDetails} = ComicContextConsumer
    let { comicDetail, comicEps, firstEpsOfComic, likeCount, likes, epsCount, commentFromUser } = comicDetails
    const checkInclude = likes.includes(user.id)

    let [ storeComment, setStoreComment ] = useState([])
    let [ checkLike, setCheckLike ] = useState()
    let [ countLike, setCountLike ] = useState(0)
    let [ limitData, setLimitData ] = useState(3)

    useEffect(() => {
        setCountLike(likeCount)

        return () => console.log("remove count like")
    }, [likeCount])



    useEffect(() => {
        setStoreComment(commentFromUser.slice(0, limitData))

        return () => setStoreComment("")
    }, [commentFromUser, limitData])




    const userLikeHandler = async (id) => {
        const getToken = localStorage.getItem("token")
        const decoded = JSON.parse(getToken)
        const { accessToken } = decoded
        const response = await axios({
            method: "POST",
            url: "https://evening-atoll-90051.herokuapp.com/like",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                id: id,
            },
        })

        console.log(`like: ${checkInclude}`)
        if(response.data.emit === "unlike"){
            // comicDetailDispatch({
            //     type: "DECREASE_LIKE",
            //     payload: {
            //         likeCount: setCountLike(countLike - 1)
            //     }
            // })
            setCountLike(countLike - 1)
            setCheckLike(false)
            
        } if (response.data.emit === "like"){ 
            // comicDetailDispatch({
            //     type: "INCREASE_LIKE",
            //     payload: {
            //         likeCount: setCountLike(countLike + 1)
            //     }
            // })
            setCountLike(countLike + 1)
            setCheckLike(true)
        }
        
        console.log(countLike)
        console.log(response.data)

    }

        const userCommentHandler = async (id, event) => {
            event.preventDefault();
            const getToken = localStorage.getItem("token")
            const decoded = JSON.parse(getToken)

            const response = await axios({
                method: "POST",
                url: "https://evening-atoll-90051.herokuapp.com/comment",
                headers: {
                    "Authorization": `Bearer ${decoded.accessToken}`
                },
                data: {
                    comicId: id,
                    comment: comment
                }
            })

            console.log(response.data)

            setStoreComment([...storeComment, {
                username: user.username,
                comment: comment,
                dateCommented: new Date().toUTCString()
            }].reverse())
            setComment("")
            window.scrollTo(0,700)
        }

        const updateLikeHandler = async (comicId) => {
            try {
                const response = await axios.post("https://evening-atoll-90051.herokuapp.com/view", {
                    comicId: comicId
                })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    
    return (
        <div>
            <Container maxW = "container.xl">
                        <div key = {comicDetail._id}>
                            <Heading>{comicDetail.title}</Heading>
                            <Text mt = "5px">Uploaded date: {comicDetail.uploadDate}</Text>
                            <div style = {{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px"}}>
                                <Box>
                                    <Image w = "340px" h = "455px" src = {comicDetail.backgroundImage} />
                                </Box>
                                    <Box h = "460px" w = "885px" bg = {boxBg} rounded={"10px"}>
                                        <Heading ml = "20px" mt = "20px" size = "md">
                                            Description
                                        </Heading>
                                        <Box>
                                            <HStack ml = "20px" mt = "10px">
                                                <Text fontWeight={"bold"}>
                                                    Title:
                                                </Text>
                                                <Text>{comicDetail.title}</Text>
                                            </HStack>
                                        </Box>
                                        <Box>
                                            <HStack ml = "20px" mt = "10px">
                                                <Text fontWeight={"bold"}>
                                                    Author:
                                                </Text>
                                                <Text>{comicDetail.author}</Text>
                                            </HStack>
                                        </Box>
                                        <Box>
                                            <HStack ml = "20px" mt = "10px">
                                                <Text fontWeight={"bold"}>
                                                    Newest eps:
                                                </Text>
                                                <Text>{epsCount}</Text>
                                            </HStack>
                                        </Box>
                                        <Box  maxH={"140px"}>
                                            <HStack ml = "20px" mt = "10px">
                                                <Text>
                                                    <b>Description:</b><Text>{comicDetail.description}</Text>
                                                </Text>
                                            </HStack>
                                        </Box>
                                        <Center  mt = { width < 500 ? "60px" : "100px" } style = {{ display: "flex", flexWrap: "wrap" }}>
                                            <Button 
                                                rounded={"20px"} 
                                                colorScheme = "teal" 
                                                onClick={updateLikeHandler.bind(this, comicDetail._id)}>
                                                    <Link 
                                                        to = {`/comic/${comicDetail._id}/${firstEpsOfComic}`}>
                                                            Read the first chap
                                                    </Link>
                                            </Button>
                                            <Button variant = { (checkLike === true) ? "solid" : "outline"} disabled = {!localStorage.getItem("token") ? true : false } onClick={userLikeHandler.bind(this, comicDetail._id)} ml = "10px" rounded={"20px"} w = "170px" colorScheme = "red">Like: {countLike}</Button>
                                            <Button  ml = "10px" rounded={"20px"} w = "170px" colorScheme = "blue" mt = { width < 500 ? "10px" : "0px"}><a href = "#comment">Comment</a></Button>
                                        </Center>
                                    </Box>
                            </div>   
                                        <Box h = "200px" mt = "15px" bg = {boxBg} rounded = "10px">
                                            <Box ml = "20px">
                                                <Box mt = {5}>
                                                    <Heading size = "md">Episode</Heading>
                                                </Box>
                                                <Box mt = {5}>
                                                    <Button variant = {"link"} onClick = {updateLikeHandler.bind(this, comicDetail._id)}>
                                                        {comicEps}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                        </div>
                    <Box id = "comment" mt = "10px" bg = {boxBg} rounded={"10px"}> 
                        <form onSubmit={userCommentHandler.bind(this, comicDetail._id)}>
                            <FormControl>
                                <Heading mt = "30px" ml = "10px" size = "md">Comment as <span>{(user.username) ? user.username: "guest"}</span></Heading>
                                <Input disabled = {localStorage.getItem("token") ? false : true} placeholder='comment...' name = "comment" ml = "10px" borderColor={"gray.400"} mt = "20px" w = "95%" value = {comment} onChange = {(event) => setComment(event.target.value)}/>
                                { !localStorage.getItem("token") ? <FormHelperText ml = "20px">you must do the authorization phase to comment on this comic</FormHelperText> : "" }
                            </FormControl>
                        </form>
                        {storeComment.map(comment => (
                            <Box mt = "20px" h = "100px">
                                <HStack ml = "18px">
                                    <Circle bg = "orange" size = "40px">
                                        <Text color = "white" fontWeight = "bold">{comment.username.substring(0,1).toUpperCase()}</Text>
                                    </Circle>
                                    <Heading mt = "10px" ml = "10px" size = 'sm'>{comment.username}</Heading>
                                </HStack>
                                <Text ml = "20px" mt = "5px">{comment.comment}</Text>
                                <Text fontSize={"12px"} ml = "20px" mt = "10px" color = "whiteAlpha.500">{comment.dateCommented}</Text>
                            </Box>
                        ))}
                        <Box>
                            { limitData <= storeComment.length ? (
                                <Button
                                    mt = "20px" 
                                    ml = "20px" 
                                    variant = "link"
                                    onClick = {
                                        () => {
                                            setLimitData(prev => prev + 4)
                                        }
                                    }
                                    >See more
                                </Button>
                            ) : ""}
                        </Box>
                    </Box>
            </Container>
        </div>
    )
}

export default ComicDetail