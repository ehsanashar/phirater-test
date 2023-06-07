
const categoriesReducer = (categories = [], action) => {
    switch (action.type) {
        case 'FIND_CATEGORIES_BY_CRITERIA':
            return action.payload.data
            break

        default:
            return categories
    }
}

export default categoriesReducer