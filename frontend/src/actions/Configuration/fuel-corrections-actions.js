import API from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findFuelCorrectionsByCriteriaAsync = (data) => {
    return { type: 'FIND_FUEL_CORRECTIONS_BY_CRITERIA', payload: data }
}

export const findFuelCorrectionsByCriteria = (criteria = {}) => async (dispatch) => {
    try {
        API.post('/config/fuel-corrections/findByCriteria', criteria)
            .then(res => {
                dispatch(findFuelCorrectionsByCriteriaAsync(res.data))
            })
            .catch(error => {
                console.log(error.message)
            })

    } catch (error) {
        console.log(error.message)
    }
}

export const createFuelCorrection = (fuelCorrection) => async (dispatch) => {
    try {
        API.post('/config/fuel-corrections/createFuelCorrection', fuelCorrection)
            .then(res => {
                toast.success('Fuel Corrections created.')
                dispatch(findFuelCorrectionsByCriteria())
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateFuelCorrection = (id, fuelCorrection) => async (dispatch) => {
    try {
        API.patch(`/config/fuel-corrections/updateFuelCorrection/${id}`, fuelCorrection)
            .then(res => {
                toast.success('Fuel Correction updated.')
                dispatch(findFuelCorrectionsByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteFuelCorrection = (id) => async (dispatch) => {
    try {
        API.delete(`/config/fuel-corrections/deleteFuelCorrection/${id}`)
            .then(res => {
                dispatch(findFuelCorrectionsByCriteria())
            })
            .catch(error => {
                console.log(error.message)
            })
    } catch (error) {
        console.log(error.message)
    }
}