import React, { useState } from "react"
import useStyles from './styles'
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from "@material-ui/core"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost } from "../../../actions/posts-actions"

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const Likes = () => {
        return (
            <>
                {
                    post.likes.findIndex((id) => id.toString() === user?.result?._id) === -1 ?
                        <ThumbUpAltOutlined /> : <ThumbUpAltIcon />
                }
                &nbsp;
                {post.likes.length === 1 ? 'Like' : 'Likes'} {post.likes.length}
            </>
        )
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {`${post.creator.firstName} ${post.creator.lastName}`}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {
                user && user.result._id === post.creator._id &&
                <div className={classes.overlay2}>
                    <Button
                        style={{ color: 'white' }}
                        size="small" onClick={() => { setCurrentId(post._id) }}
                    >
                        <MoreHorizIcon fontSize="small" />
                    </Button>
                </div>
            }

            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map(tag => `#${tag} `)}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id, navigate)) }}>
                    <Likes />

                </Button>
                {
                    user && user.result._id === post.creator._id &&
                    <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon />
                        Delete
                    </Button>
                }

            </CardActions>

        </Card>
    )
}

export default Post