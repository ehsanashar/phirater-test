
const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
            break

        default:
            return posts
    }
}

export default postsReducer