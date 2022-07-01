import React, { useEffect, useReducer} from 'react'
import { createContext, useContext } from 'react'
import { comicDetailReducer, comicDetailState } from './reducer'
import { useParams, Link } from 'react-router-dom'
import { UserSlice } from '../UserReducer/context'

export const ComicDetailContext = createContext()


const ComicDetailProvider = ({ children }) => {

    const params = useParams()

    let [ comicDetails, comicDetailDispatch ] = useReducer(comicDetailReducer, comicDetailState)
    let { comicDetail } = comicDetails

    const { user } = useContext(UserSlice)


    useEffect(() => {
        const getComicDetail = async (id) => {
        const response = await fetch(`https://evening-atoll-90051.herokuapp.com/getComic?id=${id}`)
            const data = await response.json()

            const { eps } = data.currentComic

            comicDetailDispatch({
                type: "GET_CURRENT_COMIC",
                payload: {
                    success: data.success,
                    message: data.message,
                    comicDetail: data.currentComic,
                    firstEpsOfComic: data.currentComic.eps[0].epsNum,
                    getCurrentEps: data.currentComic.eps.find(ep => { return ep.epsNum === params.eps }),
                    comicEps: data.currentComic.eps.map(ep => (<Link style = {{ marginLeft: "20px" }} to = {`/comic/${comicDetail._id}/${ep.epsNum}`}>{ep.epsNum}</Link>)),
                    likes: data.currentComic.likes,
                    likeCount: data.currentComic.likes.length,
                    epsCount: eps[eps.length - 1].epsNum,
                    isLike: data.currentComic.likes.includes(user.id),
                    commentFromUser: data.currentComic.comments.map(commentFromUser => ({
                        username: commentFromUser.userComment.username,
                        comment: commentFromUser.comment,
                        dateCommented: commentFromUser.commentedDate
                    }))
                }
            })
        } 
        getComicDetail(params.id)

        return () => console.log("clear action")
    }, [params.id, comicDetail._id, params.eps, user.id])



    const values = {
        comicDetails,
        comicDetailDispatch
    }


    return (
        <div>
            <ComicDetailContext.Provider value = {values}>
                {children}
            </ComicDetailContext.Provider>
        </div>
    )
}

export { ComicDetailProvider }