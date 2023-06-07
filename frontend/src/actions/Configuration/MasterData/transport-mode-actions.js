import API from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findTransportModesByCriteriaAsync = (data) => {
    return { type: 'FIND_TRANSPORT_MODES_BY_CRITERIA', payload: data }
}

const messagesAsync = (data) => {
    return { type: 'MESSAGES', payload: data }
}

export const findTransportModesByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/master-data/transport-modes/findByCriteria', criteria)
            .then(res => {
                dispatch(findTransportModesByCriteriaAsync(res.data))
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createTransportMode = (transportMode) => async (dispatch) => {
    try {
        API.post('/config/master-data/transport-modes/createTransportMode', transportMode)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findTransportModesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateTransportMode = (id, transportMode) => async (dispatch) => {
    try {
        API.patch(`/config/master-data/transport-modes/updateTransportMode/${id}`, transportMode)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findTransportModesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteTransportMode = (id) => async (dispatch) => {
    try {
        API.delete(`/config/master-data/transport-modes/deleteTransportMode/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findTransportModesByCriteria())
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
        API.post(`/config/master-data/transport-modes/setDefault/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findTransportModesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}