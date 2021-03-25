import * as CMApiUtil from '../util/channel_messages_api_util';

export const RECEIVE_ALL_CHANNEL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_CHANNEL_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_CHANNEL_MESSAGE = 'REMOVE_MESSAGE';
export const RECEIVE_CHANNEL_MESSAGE_ERRORS = 'RECEIVE_MESSAGE_ERRORS';
export const CLEAR_CHANNEL_MESSAGE_ERRORS = 'CLEAR_MESSAGE_ERRORS'

export const receiveAllChannelMessages = channelMessages => ({
    type: RECEIVE_ALL_CHANNEL_MESSAGES,
    channelMessages
});

export const receiveChannelMessage = channelMessage => ({
    type: RECEIVE_CHANNEL_MESSAGE,
    channelMessage
})

export const removeChannelMessage = channelMessageId => ({
    type: REMOVE_CHANNEL_MESSAGE,
    channelMessageId
});

export const receiveChannelMessageErrors = errors => ({
    type: RECEIVE_CHANNEL_MESSAGE_ERRORS,
    errors
});

export const clearChannelMessageErrors = () => ({
    type: CLEAR_CHANNEL_MESSAGE_ERRORS
});


export const fetchChannelMessages = channelId => dispatch => (
    CMApiUtil.fetchChannelMessages(channelId).then( channelMessages => (
        dispatch(receiveAllChannelMessages(channelMessages))
    ), (e) => (
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    ))
)

export const createChannelMessage = channelMessage => dispatch => (
    CMApiUtil.createChannelMessage(channelMessage).then( channelMessage => {
        console.log("in actions")
        return dispatch(receiveChannelMessage(channelMessage));
    }, (e) => {
        return dispatch(receiveChannelMessageErrors(e.responseJSON))
    })
)

export const updateChannelMessage = channelMessage => dispatch => (
    CMApiUtil.updateChannelMessage(channelMessage).then( channelMessage => (
        dispatch(receiveChannelMessage(channelMessage))
    ), (e) => {
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    })
)

export const deleteChannelMessage = channelMessageId => dispatch => (
    CMApiUtil.deleteChannelMessage(channelMessageId).then( () => (
        dispatch(removeChannelMessage(channelMessageId))
    ), (e) => (
        dispatch(receiveChannelMessageErrors(e.responseJSON))
    ))
)