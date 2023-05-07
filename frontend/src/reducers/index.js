import { combineReducers } from "redux"

import authReducer from './authReducer'

// Configuration
import carriersReducer from "./Configuration/carriersReducer"
import fuelPricesReducer from "./Configuration/fuelPricesReducer"
import fuelCorrectionsReducer from "./Configuration/fuelCorrectionsReducer"
import transportModesReducer from "./Configuration/MasterData/transportModesReducer"
import locationsReducer from "./Configuration/MasterData/locationsReducer"

export default combineReducers({
    authReducer,
    // Configuration
    carriersReducer,
    fuelPricesReducer,
    fuelCorrectionsReducer,
    transportModesReducer,
    locationsReducer
})