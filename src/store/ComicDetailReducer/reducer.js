import { GET_CURRENT_COMIC, INCREASE_LIKE, DECREASE_LIKE, ADD_COMMENT } from "./method"

let comicDetailState = {
    success: "",
    message: "",
    comicDetail: {},
    comicEps: [],
    firstEpsOfComic: "",
    getCurrentEps: [],
    likes: [],
    likeCount: 0,
    epsCount: 0,
    isLike: "",
    commentFromUser: []
}


const comicDetailReducer = (state, action) => {
    switch(action.type) {
        case GET_CURRENT_COMIC: 
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                comicDetail: action.payload.comicDetail,
                currentEpsOfComic: action.payload.allEpsOfComic,
                firstEpsOfComic: action.payload.firstEpsOfComic,
                comicEps: action.payload.comicEps,
                getCurrentEps: action.payload.getCurrentEps,
                likes: action.payload.likes,
                likeCount: action.payload.likeCount,
                epsCount: action.payload.epsCount,
                isLike: action.payload.isLike,
                commentFromUser: action.payload.commentFromUser
            }

        case INCREASE_LIKE:
            return {
                ...state,
                likeCount: action.payload.likeCount
            }
        
        case DECREASE_LIKE: 
            return {
                ...state,
                likeCount: action.payload.likeCount
            }
        

        case ADD_COMMENT: {
            return {
                ...state,
                comment: action.payload.comment

            }
        }

        default:
            return state
    }
}

export { comicDetailState, comicDetailReducer}