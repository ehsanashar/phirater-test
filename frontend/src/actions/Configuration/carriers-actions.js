import API from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findByCriteriaAsync = (data) => {
    return { type: 'FIND_BY_CRITERIA', payload: data }
}

export const findByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/carriers/findByCriteria', criteria)
            .then(res => {
                dispatch(findByCriteriaAsync(res.data))
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createCarrier = (carrier) => async (dispatch) => {
    try {
        API.post('/config/carriers/createCarrier', carrier)
            .then(res => {
                toast.success('Carrier created.')
                dispatch(findByCriteria())
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateCarrier = (id, carrier) => async (dispatch) => {
    try {
        API.patch(`/config/carriers/updateCarrier/${id}`, carrier)
            .then(res => {
                toast.success('Carrier updated.')
                dispatch(findByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCarrier = (id) => async (dispatch) => {
    try {
        API.delete(`/config/carriers/deleteCarrier/${id}`)
            .then(res => {
                dispatch(findByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}