import { combineReducers } from "redux"

import authReducer from './authReducer'

// Configuration
import carriersReducer from "./Configuration/carriersReducer"
import fuelPricesReducer from "./Configuration/fuelPricesReducer"
import fuelCorrectionsReducer from "./Configuration/fuelCorrectionsReducer"

export default combineReducers({
    authReducer,
    // Configuration
    carriersReducer,
    fuelPricesReducer,
    fuelCorrectionsReducer
})