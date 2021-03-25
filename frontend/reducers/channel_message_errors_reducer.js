import { CLEAR_CHANNEL_MESSAGE_ERRORS, RECEIVE_CHANNEL_MESSAGE_ERRORS } from "../actions/channel_message_actions";


const channelMessageErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CHANNEL_MESSAGE_ERRORS:
            return action.errors
        case CLEAR_CHANNEL_MESSAGE_ERRORS:
            return [];
        default:
            return state;
    }
}

export default channelMessageErrorsReducer