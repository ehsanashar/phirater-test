
const locationsReducer = (lcoations = [], action) => {
    switch (action.type) {
        case 'FIND_LOCATIONS_BY_CRITERIA':
            return action.payload.data
            break

        default:
            return lcoations
    }
}

export default locationsReducer