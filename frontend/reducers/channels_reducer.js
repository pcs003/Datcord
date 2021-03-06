import { RECEIVE_ALL_CHANNELS, RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../actions/channel_actions"


const channelsReducer = (state = {}, action) => {
    Object.freeze(state)
    
    switch(action.type) {
        case RECEIVE_ALL_CHANNELS:
            return action.channels
        case RECEIVE_CHANNEL:
            return Object.assign({}, state, { [action.channel.id]: action.channel })
        case REMOVE_CHANNEL:
            let nextState = Object.assign({}, state)
            delete nextState[action.channelId]
            return nextState
        default:
            return state;
    }
}

export default channelsReducer