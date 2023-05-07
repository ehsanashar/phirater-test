
const transportModesReducer = (transportModes = [], action) => {
    switch (action.type) {
        case 'FIND_TRANSPORT_MODES_BY_CRITERIA':
            return action.payload.data
            break

        default:
            return transportModes
    }
}

export default transportModesReducer