import { GET_COMIC, HIDE_COMIC, SHOW_COMIC } from "./method"

let comicState = {
    success: "",
    message: "",
    comic: [],
    isShow: true
}

const comicReducer = (state, action) => {
    switch(action.type) {
        case GET_COMIC: 
            return {
                ...comicState,
                success: action.payload.success,
                message: action.payload.message,
                comic: action.payload.comics
            }
        
        case HIDE_COMIC:
            return {
                ...comicState,
                comic: action.payload.comics,
                isShow: action.payload.isShow
            }

            case SHOW_COMIC:
                return {
                    ...comicState,
                    comic: action.payload.comics,
                    isShow: action.payload.isShow
                }
        
            default: 
                return state
    }
}

export { comicState, comicReducer }