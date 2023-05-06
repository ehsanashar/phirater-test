import React from "react"
import Post from "./Post/Post"
import useStyles from './styles'
import { Grid, CircularProgress } from "@material-ui/core"

import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const posts = useSelector((state) => state.postsReducer)

    return (
        !posts.length ? <CircularProgress /> : (
            <>Carriers Here</>
        )
    )
}

export default Posts