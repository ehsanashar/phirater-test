
import axios from 'axios'
import API from '../api'


const fetchAll = (data) => {
    return { type: 'FETCH_ALL', payload: data }
}

const create = (data) => {
    return { type: 'CREATE', payload: data }
}

/**
 * 
 * @returns 
 */
export const getPosts = () => async (dispatch) => {
    try {
        API.get('/posts')
            .then(res => {
                dispatch(fetchAll(res.data))
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        API.post('/posts', post)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        API.patch(`/posts/${id}`, post)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        API.delete(`/posts/${id}`)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id, navigate) => async (dispatch) => {
    try {
        API.patch(`/posts/${id}/likePost`)
            .then(res => {
                dispatch(getPosts())
            })
            .catch(error => {
                if(error.response.status === 401) {
                    navigate('/auth')
                }
            })
    } catch (error) {
        console.log(error)
    }
}
