import React, { createContext, useState } from 'react'

export const SearchInputSlice = createContext()

const SearchInput = ({ children }) => {

    const [ inputText, setInputText ] = useState("")

    const inputChange = (event) => {
        setInputText(event.target.value)
    }

    const value = {
        inputText,
        inputChange
    }

    return (
        <SearchInputSlice.Provider value = {value}>
            { children }
        </SearchInputSlice.Provider>
    )
}

export default SearchInput