import { CLEAR_PRIVATE_MESSAGE_ERRORS, RECEIVE_PRIVATE_MESSAGE_ERRORS } from "../actions/private_message_actions";


const privateMessageErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_PRIVATE_MESSAGE_ERRORS:
            return action.errors
        case CLEAR_PRIVATE_MESSAGE_ERRORS:
            return [];
        default:
            return state;
    }
}

export default privateMessageErrorsReducer