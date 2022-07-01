import { Container, Box, Heading, Flex, Button, Spacer, Image, HStack, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ComicDetailContext } from '../../store/ComicDetailReducer/context'

const EpsComic = () => {

    const params = useParams()

    const ComicContextConsumer = useContext(ComicDetailContext)
    const { comicDetails } = ComicContextConsumer
    const { comicDetail } = comicDetails

    const [ currentComic, setCurrentComic ] = useState([])

    useEffect(() => {
        window.scrollTo({
            left: 0,
            top: 0
        })

        return () => console.log("clear scroll effect")
    }, [])

    useEffect(() => {

        const getComic = async (eps) => {
            const getEps = await comicDetail.eps.filter(ep => ep.epsNum.toString() === eps)
            setCurrentComic(getEps)
        }  

        getComic(params.eps)

        return () => setCurrentComic([])

    }, [comicDetail.eps, params.eps])

    return (
        <div>
            <Container maxW = "container.lg">
                <Box>
                    <HStack>
                        <Heading size = "lg">{comicDetail.title}</Heading>
                        <Text ml = "20px">Episode: {currentComic.map(eps => eps.epsNum)}</Text>
                    </HStack>
                        <Box mt = "10px">
                            {currentComic.map(eps => {
                                return (
                                    <div>
                                        <div>
                                            <Flex>
                                                {parseInt(params.eps) === 1 ? "" :<Box>
                                                    <Button variant = "link"><Link to = {`/comic/${comicDetail._id}/${eps.epsNum - 1}`}>Last eps</Link></Button>
                                                </Box>}
                                                <Spacer />
                                                <Box>
                                                    <Button variant = "link"><Link to = {`/comic/${comicDetail._id}/${currentComic.map(comic => comic.epsNum + 1)}`}>Next eps</Link></Button>
                                                </Box>
                                            </Flex>
                                        </div>
                                    </div>
                                )
                            })}
                        </Box>
                        <Box mt = "20px">
                            {currentComic.map(eps => eps.epsImages.map(image => {
                                return (
                                    <Image src = {image.url}></Image>
                                )
                            }))}
                        </Box>
                        <Box mt = "10px">
                            {currentComic.map(eps => {
                                return (
                                    <div>
                                        <div>
                                            <Flex>
                                                {parseInt(params.eps) === 1 ? "" : <Box>
                                                    <Button variant = "link"><Link to = {`/comic/${comicDetail._id}/${eps.epsNum - 1}`}>Last eps</Link></Button>
                                                </Box>}
                                                <Spacer />
                                                <Box>
                                                    <Button variant = "link"><Link to = {`/comic/${comicDetail._id}/${currentComic.map(comic => comic.epsNum + 1)}`}>Next eps</Link></Button>
                                                </Box>
                                            </Flex>
                                        </div>
                                    </div>
                                )
                            })}
                        </Box>
                </Box>
            </Container>
        </div>
    )
}

export default EpsComic