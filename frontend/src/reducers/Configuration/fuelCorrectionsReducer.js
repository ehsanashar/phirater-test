
const fuelCorrectionsReducer = (fuelCorrections = [], action) => {
    switch (action.type) {
        case 'FIND_FUEL_CORRECTIONS_BY_CRITERIA':
            return action.payload.data

        default:
            return fuelCorrections
    }
}

export default fuelCorrectionsReducer