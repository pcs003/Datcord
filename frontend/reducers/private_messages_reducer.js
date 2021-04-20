import { RECEIVE_ALL_PRIVATE_MESSAGES, RECEIVE_PRIVATE_MESSAGE, REMOVE_PRIVATE_MESSAGE } from "../actions/private_message_actions";


const PrivateMessagesReducer = (state={}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_ALL_PRIVATE_MESSAGES:
            return action.privateMessages
        case RECEIVE_PRIVATE_MESSAGE:
            return Object.assign( {}, state, { [action.privateMessage.id]: action.privateMessage } )
        case REMOVE_PRIVATE_MESSAGE:
            let nextState = Object.assign({}, state);
            delete nextState[action.privateMessageId];
            return nextState;
        default:
            return state
    }
}

export default PrivateMessagesReducer