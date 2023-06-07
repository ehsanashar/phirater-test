import { combineReducers } from "redux"

import authReducer from './authReducer'

//Messages
import messagesReducer from "./messagesReducer"

// Configuration
import carriersReducer from "./Configuration/carriersReducer"
import fuelPricesReducer from "./Configuration/fuelPricesReducer"
import fuelCorrectionsReducer from "./Configuration/fuelCorrectionsReducer"
import transportModesReducer from "./Configuration/MasterData/transportModesReducer"
import locationsReducer from "./Configuration/MasterData/locationsReducer"
import categoriesReducer from "./Configuration/MasterData/categoriesReducer"


export default combineReducers({
    authReducer,
    messagesReducer,
    // Configuration
    carriersReducer,
    fuelPricesReducer,
    fuelCorrectionsReducer,
    transportModesReducer,
    locationsReducer,
    categoriesReducer
})