import { combineReducers } from "redux";
import channelsReducer from "./channels_reducer";
import ChannelMessagesReducer from "./channel_messages_reducer";
import PrivateMessagesReducer from "./private_messages_reducer";
import serversReducer from "./servers_reducer";
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    servers: serversReducer,
    channels: channelsReducer,
    channelMessages: ChannelMessagesReducer,
    privateMessages: PrivateMessagesReducer
})

export default entitiesReducer;