
const messagesReducer = (messages = {}, action) => {
    switch (action.type) {
        case 'MESSAGES':
            return action.payload.data ? action.payload.data : action.payload

        default:
            return messages
    }
}

export default messagesReducer