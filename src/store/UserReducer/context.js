import axios from 'axios'
import React, { createContext, useEffect, useReducer } from 'react'
import { userState, userReducer } from './reducer'

export const UserSlice = createContext()

const UserProvider = ({ children }) => {

    const [ user, userDispatch ] = useReducer(userReducer, userState)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const decodeToken = JSON.parse(token)
        const getUserId = async () => {
            const response = await axios.get("https://evening-atoll-90051.herokuapp.com/info", {
                headers: {
                    "Authorization": `Bearer ${decodeToken.accessToken}`
                }
            })
            userDispatch({
                type: "GET_USER_INFO",
                payload: {
                    id: response.data.id,
                    username: response.data.username
                }
            })
        }

        getUserId()
    }, [])

    const values = {
        user
    }

    return (
        <div>
            <UserSlice.Provider value = {values}>
                { children }
            </UserSlice.Provider>
        </div>
    )
}

export default UserProvider