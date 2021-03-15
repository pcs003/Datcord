import { LOGOUT_CURRENT_USER, RECEIVE_CURRENT_USER } from "../actions/session_actions";



const sessionReducer = (defaultState = { id: null }, action) => {
    Object.freeze(defaultState);

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.currentUser.id };
        case LOGOUT_CURRENT_USER:
            return { id: null };
        default:
            return defaultState;
    }
}

export default sessionReducer;