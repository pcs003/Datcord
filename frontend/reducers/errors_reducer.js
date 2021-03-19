import { combineReducers } from "redux";
import serverErrorsReducer from "./server_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";


const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    server: serverErrorsReducer,
})

export default errorsReducer;