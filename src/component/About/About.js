import { Image, Box, Text, Button, Link } from '@chakra-ui/react';
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const AboutComponent = () => {

  return (
    <div>
        <Carousel autoPlay infiniteLoop>
            <Box>
                <Box sx = {{ position: "absolute", zIndex: 2}}>
                    <Box sx = {{ position: "absolute", h: "1070px", w: "1900px", background: "black", opacity: "60%", zIndex: 1}} />
                    <Image alt = "background_1"  src="https://i.pinimg.com/originals/82/20/6f/82206ff0e8e108703e43a64ac3f72bff.jpg" />
                </Box>
                    <Box  mb = "300px" sx = {{ position: "absolute", zIndex: 3, bottom: 0, right: 0}}>
                        <Text fontSize={"100px"} mr = "30px">ENJOY YOUR COMIC WORLD</Text>
                        <Button sx = {{ h: "100px", w: "300px", float: "right", mr: "30px"}} fontSize="20px">
                            <Link  href = "/">EXPLORE NOW !</Link>
                        </Button>
                    </Box>
            </Box>
            <Box>
                <Box>
                    <Box sx = {{ position: "absolute", h: "1070px", w: "1900px", background: "black", opacity: "60%", zIndex: 1}} />
                    <Image alt = "background_1" src="https://i.pinimg.com/originals/d3/34/32/d3343266473dcfa007b18880ecf996dd.jpg" />
                </Box>
                <Box  mb = "300px" sx = {{ position: "absolute", zIndex: 3, bottom: 0, right: 0}}>
                    <Text fontSize={"100px"} mr = "30px">NEW COMIC: IRON MAN(1968)</Text>
                    <Button sx = {{ h: "100px", w: "300px", float: "right", mr: "30px"}} fontSize="20px">
                        <Link  href = "/comic/62255078dc1893ab528f69c2">EXPLORE NOW !</Link>
                    </Button>
                </Box>
            </Box>
            <Box>
                <Box>
                    <Box sx = {{ position: "absolute", h: "1070px", w: "1900px", background: "black", opacity: "60%", zIndex: 1}} />
                    <Image alt = "background_1" src="https://a-static.besthdwallpaper.com/manga-kimetsu-no-yaiba-wallpaper-1920x1080-42586_48.jpg" />
                </Box>
                <Box  mb = "300px" sx = {{ position: "absolute", zIndex: 3, bottom: 0, right: 0}}>
                    <Text fontSize={"100px"} mr = "30px">READER CHOICE: KIMETSU NO YAIBA</Text>
                    <Button sx = {{ h: "100px", w: "300px", float: "right", mr: "30px"}} fontSize="20px">
                        <Link  href = "/comic/62255078dc1893ab528f69c2">EXPLORE NOW !</Link>
                    </Button>
                </Box>
            </Box>
        </Carousel>
    </div>
  )
}

export { AboutComponent }