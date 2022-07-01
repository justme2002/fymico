import React, { useEffect, useState } from 'react'
import { Container, Box, Image, Text, useColorModeValue } from '@chakra-ui/react'
import BannerSkeletion from '../Skeleton/BannerSkeletion'

const Banner = ({ isLoading }) => {

    const color = useColorModeValue("teal.400", "white")


    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth)
    const [ textSize, setTextSize ] = useState({
        title: "90px",
        description: "30px"
    })

    const [ imageHeight, setImageHeight ] = useState("600px")

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.innerWidth)
        })
        if(window.innerWidth < 500) {
            setTextSize({
                title: "40px",
                description: "15px"
            })
            setImageHeight("300px")
        } else {
            setTextSize({
                title: "100px",
                description: "20px"
            })
            setImageHeight("600px")

        }

        return () => console.log("clean banner effect")

    }, [screenWidth])

    const banners = [
        {
            id: 1,
            src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2904f31a-77ba-45b6-9f62-184e2a7a5190/dd0dvbi-e2f51f36-3549-4982-a6a8-57151521a1f4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI5MDRmMzFhLTc3YmEtNDViNi05ZjYyLTE4NGUyYTdhNTE5MFwvZGQwZHZiaS1lMmY1MWYzNi0zNTQ5LTQ5ODItYTZhOC01NzE1MTUyMWExZjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TA--_atjaHhx_zzhZI4fB3FwXr8VH6sp3WYH4mQZdB4",
            title: "Spider Gwen",
            description: "New avenger hero has landed to your home !"
        },
        {
            id: 2,
            src: "https://wallpaperaccess.com/full/1917480.jpg",
            title: "Demon Slayer",
            description: "First ever manga will bring the new style and experience"
        },
        {
            id: 3,
            src: "https://getyourcomicon.co.uk/wp-content/uploads/2021/04/Iron-Man.jpg",
            title: "Iron Man",
            description: "Bring all emotions to the first statue of Marvel art and cinematic"
        }
    ]


    return (
        <div>
            <Container maxW = "container.lg">
                { isLoading === true ? <BannerSkeletion imageHeight={imageHeight} /> : ""}
                { isLoading === false ? banners.map(banner => {
                    return (
                        <Box mt = "10px" key={banner.id} style = {{ position: "relative"}}>
                            <Image
                                src = {banner.src}
                                filter = "brightness(30%)"
                                width={"100%"}
                                height={imageHeight}
                            />
                            <Text
                                style = {{ position: "absolute", bottom: 0 }}
                                color={color}
                                fontSize={textSize.title}
                                fontWeight={"bold"}
                                ml = "20px"    
                                mb = "80px"
                            >{banner.title}</Text>
                            <Text
                                color = {color}
                                style = {{ position: "absolute", bottom: 0 }}
                                fontSize={textSize.description}
                                mb = "40px"
                                ml = "26px"    
                            >
                                {banner.description}
                            </Text>
                        </Box>
                    )
                }): ""}
            </Container>
        </div>
    )
}

export default Banner