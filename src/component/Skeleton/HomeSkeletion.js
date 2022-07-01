import React from 'react'
import { Container, Skeleton, Flex } from '@chakra-ui/react'

const HomeSkeletion = ({ width, loaded }) => {

  return (
    <div>
        <Container maxW = "container.lg" mt = "30px">
            <Flex direction={"row"} gap = "5px"  flexWrap={"wrap"}>
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
                <Skeleton isLoaded = {loaded} height = "400px" width = {width} rounded={"10px"} />
            </Flex>
        </Container>
    </div>
  )
}

export default HomeSkeletion