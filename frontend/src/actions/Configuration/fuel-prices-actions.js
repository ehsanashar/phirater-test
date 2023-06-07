import API from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findFuelPricesByCriteriaAsync = (data) => {
    return { type: 'FIND_FUEL_PRICES_BY_CRITERIA', payload: data }
}

const messagesAsync = (data) => {
    return { type: 'MESSAGES', payload: data }
}

export const findFuelPricesByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/fuel-prices/findByCriteria', criteria)
            .then(res => {
                dispatch(findFuelPricesByCriteriaAsync(res.data))
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createFuelPrice = (fuelPrice) => async (dispatch) => {
    try {
        API.post('/config/fuel-prices/createFuelPrice', fuelPrice)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateFuelPrice = (id, fuelPrice) => async (dispatch) => {
    try {
        API.patch(`/config/fuel-prices/updateFuelPrice/${id}`, fuelPrice)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteFuelPrice = (id) => async (dispatch) => {
    try {
        API.delete(`/config/fuel-prices/deleteFuelPrice/${id}`)
            .then(res => {
                dispatch(messagesAsync(res))
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                dispatch(messagesAsync(error.response))
            })
    } catch (error) {
        console.log(error.message)
    }
}