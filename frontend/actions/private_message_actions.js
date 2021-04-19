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
    PMApiUtil.fetchPrivateMessages(recipientId).then( privateMessages => (
        dispatch(receiveAllPrivateMessages(privateMessages))
    ), (e) => (
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

export const updateChannelMessage = channelMessage => dispatch => (
    PMApiUtil.updateChannelMessage(channelMessage).then( channelMessage => (
        dispatch(receiveChannelMessage(channelMessage))
    ), (e) => {
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    })
)

export const deleteChannelMessage = channelMessageId => dispatch => (
    PMApiUtil.deleteChannelMessage(channelMessageId).then( () => (
        dispatch(removeChannelMessage(channelMessageId))
    ), (e) => (
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    ))
)