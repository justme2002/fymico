import { GET_USER_INFO } from './method'


const userState = {
    id: "",
    username: ""
}

const userReducer = (state, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username
            }

        default:
            return state
    }
}

export { userState, userReducer } 