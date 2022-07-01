import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

const BannerSkeletion = ({ imageHeight }) => {
  return (
    <div>
        <Box>
            <Skeleton width = "100%" height = {imageHeight}/>
            <Skeleton mt = "10px" width = "100%" height = {imageHeight}/>
            <Skeleton mt = "10px" width = "100%" height = {imageHeight}/>
        </Box>
    </div>
  )
}

export default BannerSkeletion