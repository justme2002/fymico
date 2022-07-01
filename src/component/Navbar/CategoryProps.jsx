import { Button, Text, Accordion, AccordionPanel, AccordionButton, AccordionItem,  Box, ListItem, UnorderedList, AccordionIcon, Link } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const CategoryProps = ({ mt }) => {

    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await axios.get("http://localhost:4000/category")
                setCategories(response.data.categories)
            } catch (error) {
                console.log(error)
            }
        }

        getCategory()
    }, [])    

    return (
        <div>
            <Box mt = {mt}>
                <Accordion allowToggle = {true}>
                    <AccordionItem>
                        <AccordionButton>
                            <Text>Category</Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            { categories.map(category => (
                                <div id = {category._id}>
                                    <UnorderedList pt = "10px">
                                        <ListItem>
                                            <Button variant = "link"><Link href = "#">{category.category}</Link></Button>
                                        </ListItem>
                                    </UnorderedList>
                                </div>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
        </div>
    )
}

export default CategoryProps