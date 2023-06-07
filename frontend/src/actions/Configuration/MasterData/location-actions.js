import API from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findLocationsByCriteriaAsync = (data) => {
    return { type: 'FIND_LOCATIONS_BY_CRITERIA', payload: data }
}

const messagesAsync = (data) => {
    return { type: 'MESSAGES', payload: data }
}

export const findLocationsByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/master-data/locations/findByCriteria', criteria)
            .then(res => {
                dispatch(findLocationsByCriteriaAsync(res.data))
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createLocation = (location) => async (dispatch) => {
    try {
        API.post('/config/master-data/locations/createLocation', location)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findLocationsByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateLocation = (id, location) => async (dispatch) => {
    try {
        API.patch(`/config/master-data/locations/updateLocation/${id}`, location)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findLocationsByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteLocation = (id) => async (dispatch) => {
    try {
        API.delete(`/config/master-data/locations/deleteLocation/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findLocationsByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const setDefault = (id) => async (dispatch) => {
    try {
        API.post(`/config/master-data/locations/setDefault/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findLocationsByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}