import * as APIUtil from '../util/session_api_util';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"


export const login = (user) => (dispatch) => (
    APIUtil.login(user).then(user => (
        dispatch(receiveCurrentUser(user))
    ), (e) => {
        return dispatch(receiveErrors(e.responseJSON))
    })
)

export const logout = () => (dispatch) => (
    APIUtil.logout().then(() => (
        dispatch(logoutCurrentUser())
    ))
)



export const signup = (user) => (dispatch) => (
    APIUtil.signup(user).then(user => (
        dispatch(receiveCurrentUser(user))
    ), (e) => (
        dispatch(receiveErrors(e.responseJSON))
    ))
)

export const addFriend = friendee_id => dispatch => (
    APIUtil.addFriend(friendee_id).then(user => (
        dispatch(receiveCurrentUser(user))
    ), (e) => (
        dispatch(receiveErrors(e.responseJSON))
    ))
)

export const acceptFriend = friendship_id => dispatch => (
    APIUtil.acceptFriend(friendship_id).then(user => (
        dispatch(receiveCurrentUser(user))
    ), (e) => (
        dispatch(receiveErrors(e.responseJSON))
    ))
)

export const removeFriend = friend_id => dispatch => (
    APIUtil.removeFriend(friend_id).then(user => (
        dispatch(receiveCurrentUser(user))
    ), e => (
        dispatch(receiveErrors(e.responseJSON))
    ))
)

export const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})


export const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})