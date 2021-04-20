import { combineReducers } from "redux";
import channelErrorsReducer from "./channel_errors_reducer";
import channelMessageErrorsReducer from "./channel_message_errors_reducer";
import privateMessageErrorsReducer from "./private_message_errors_reducer";
import serverErrorsReducer from "./server_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";


const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    server: serverErrorsReducer,
    channel: channelErrorsReducer,
    channelMessage: channelMessageErrorsReducer,
    privateMessage: privateMessageErrorsReducer
})

export default errorsReducer;