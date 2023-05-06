
const fuelPricesReducer = (fuelPrices = [], action) => {
    switch (action.type) {
        case 'FIND_FUEL_PRICES_BY_CRITERIA':
            return action.payload.data

        default:
            return fuelPrices
    }
}

export default fuelPricesReducer