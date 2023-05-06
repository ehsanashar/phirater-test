
const carriersReducer = (carriers = [], action) => {
    switch (action.type) {
        case 'FIND_BY_CRITERIA':
            return action.payload.data
            break

        default:
            return carriers
    }
}

export default carriersReducer