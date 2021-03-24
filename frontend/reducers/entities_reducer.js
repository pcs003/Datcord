import { combineReducers } from "redux";
import channelsReducer from "./channels_reducer";
import serversReducer from "./servers_reducer";
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    servers: serversReducer,
    channels: channelsReducer
})

export default entitiesReducer;