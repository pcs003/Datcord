import { RECEIVE_ALL_CHANNEL_MESSAGES, RECEIVE_CHANNEL_MESSAGE, REMOVE_CHANNEL_MESSAGE } from "../actions/channel_message_actions";


const ChannelMessagesReducer = (state={}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_ALL_CHANNEL_MESSAGES:
            return action.channelMessages
        case RECEIVE_CHANNEL_MESSAGE:
            return Object.assign( {}, state, { [action.channelMessage.id]: action.channelMessage } )
        case REMOVE_CHANNEL_MESSAGE:
            let nextState = Object.assign({}, state);
            delete nextState[action.channelMessageId];
            return nextState;
        default:
            return state
    }
}

export default ChannelMessagesReducer