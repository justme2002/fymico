import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import { comicReducer, comicState } from './reducer'
import axios from 'axios'

export const ComicSlice = createContext()

const ComicContext = ({ children }) => {

    let [ comics, comicDispatch ] = useReducer(comicReducer, comicState)
    let [ limitData, setLimitData ] = useState(8)
    let [ allComic, setAllComic ] = useState([])

    useEffect(() => {
        const getComic = async () => {
            const response = await axios.get("https://evening-atoll-90051.herokuapp.com/comic")
            comicDispatch({
                type: "GET_COMIC",
                payload: {
                    success: response.data.success,
                    message: response.data.message,
                    comics: response.data.comic.slice(0, limitData)
                }
            })
        } 
        getComic()

        return () => comicDispatch({
            payload: {
                comics: []
            }
        })
    }, [limitData])
    

    const toggleComic = () => {
        setLimitData(prev => prev + 4)
    }
    

    const values = {
        comics,
        toggleComic,
        limitData
    }

    return (
        <div>
            <ComicSlice.Provider value = {values}>
                {children}
            </ComicSlice.Provider>
        </div>
    )
}

export { ComicContext }