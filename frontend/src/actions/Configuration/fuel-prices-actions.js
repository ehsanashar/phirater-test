import API from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findFuelPricesByCriteriaAsync = (data) => {
    return { type: 'FIND_FUEL_PRICES_BY_CRITERIA', payload: data }
}

export const findFuelPricesByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/fuel-prices/findByCriteria', criteria)
            .then(res => {
                dispatch(findFuelPricesByCriteriaAsync(res.data))
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createFuelPrice = (fuelPrice) => async (dispatch) => {
    try {
        API.post('/fuel-prices/createFuelPrice', fuelPrice)
            .then(res => {
                toast.success('Fuel Price created.')
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateFuelPrice = (id, fuelPrice) => async (dispatch) => {
    try {
        API.patch(`/fuel-prices/updateFuelPrice/${id}`, fuelPrice)
            .then(res => {
                toast.success('Fuel Price updated.')
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteFuelPrice = (id) => async (dispatch) => {
    try {
        API.delete(`/fuel-prices/deleteFuelPrice/${id}`)
            .then(res => {
                dispatch(findFuelPricesByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}