import { CLEAR_CHANNEL_ERRORS, RECEIVE_CHANNEL_ERRORS } from "../actions/channel_actions";

const channelErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CHANNEL_ERRORS:
            return action.errors
        case CLEAR_CHANNEL_ERRORS:
            return [];
        default:
            return state;
    }
}

export default channelErrorsReducer