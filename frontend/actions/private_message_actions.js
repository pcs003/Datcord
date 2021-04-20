import * as PMApiUtil from '../util/private_messages_api_util';

export const RECEIVE_ALL_PRIVATE_MESSAGES = 'RECEIVE_ALL_PRIVATE_MESSAGES';
export const RECEIVE_PRIVATE_MESSAGE = 'RECEIVE_PRIVATE_MESSAGE';
export const REMOVE_PRIVATE_MESSAGE = 'REMOVE_PRIVATE_MESSAGE';
export const RECEIVE_PRIVATE_MESSAGE_ERRORS = 'RECEIVE_PRIVATE_MESSAGE_ERRORS';
export const CLEAR_PRIVATE_MESSAGE_ERRORS = 'CLEAR_PRIVATE_MESSAGE_ERRORS'

export const receiveAllPrivateMessages = privateMessages => ({
    type: RECEIVE_ALL_PRIVATE_MESSAGES,
    privateMessages
});

export const receivePrivateMessage = privateMessage => ({
    type: RECEIVE_PRIVATE_MESSAGE,
    privateMessage
})

export const removePrivateMessage = privateMessageId => ({
    type: REMOVE_PRIVATE_MESSAGE,
    privateMessageId
});

export const receivePrivateMessageErrors = errors => ({
    type: RECEIVE_PRIVATE_MESSAGE_ERRORS,
    errors
});

export const clearPrivateMessageErrors = () => ({
    type: CLEAR_PRIVATE_MESSAGE_ERRORS
});


export const fetchPrivateMessages = recipientId => dispatch => (
    PMApiUtil.fetchPrivateMessages(recipientId).then( privateMessages => {
        return dispatch(receiveAllPrivateMessages(privateMessages))
    }, (e) => (
        dispatch(receivePrivateMessageErrors(e.responseJSON))
    ))
)

export const createPrivateMessage = privateMessage => dispatch => (
    PMApiUtil.createPrivateMessage(privateMessage).then( privateMessage => {
        return dispatch(receivePrivateMessage(privateMessage));
    }, (e) => {
        return dispatch(receivePrivateMessageErrors(e.responseJSON))
    })
)

export const updatePrivateMessage = privateMessage => dispatch => (
    PMApiUtil.updatePrivateMessage(privateMessage).then( privateMessage => (
        dispatch(receivePrivateMessage(privateMessage))
    ), (e) => {
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    })
)

export const deletePrivateMessage = privateMessageId => dispatch => (
    PMApiUtil.deletePrivateMessage(privateMessageId).then( () => (
        dispatch(removePrivateMessage(privateMessageId))
    ), (e) => (
        dispatch(receivePrivateMessageErrors(e.responseJSON))
    ))
)