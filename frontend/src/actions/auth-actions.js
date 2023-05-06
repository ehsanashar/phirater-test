
import axios from 'axios'
import API from '../api'

const auth = (data) => {
    return { type: 'AUTH', payload: data }
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        API.post('/users/signin', formData)
            .then(res => {
                dispatch(auth(res.data))
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        API.post('/users/signup', formData)
            .then(res => {
                dispatch(auth(res.data))
                navigate('/')
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}