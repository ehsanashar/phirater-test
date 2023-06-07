import API from '../../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findCategoriesByCriteriaAsync = (data) => {
    return { type: 'FIND_CATEGORIES_BY_CRITERIA', payload: data }
}

const messagesAsync = (data) => {
    return { type: 'MESSAGES', payload: data }
}

export const findCategoriesByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/master-data/categories/findByCriteria', criteria)
            .then(res => {
                dispatch(findCategoriesByCriteriaAsync(res.data))
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createCategory = (category) => async (dispatch) => {
    try {
        API.post('/config/master-data/categories/createCategory', category)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findCategoriesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateCategory = (id, category) => async (dispatch) => {
    try {
        API.patch(`/config/master-data/categories/updateCategory/${id}`, category)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findCategoriesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        API.delete(`/config/master-data/categories/deleteCategory/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findCategoriesByCriteria())
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
        API.post(`/config/master-data/categories/setDefault/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findCategoriesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}