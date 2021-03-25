import * as ChannelApiUtil from '../util/channel_api_util'

export const RECEIVE_ALL_CHANNELS = 'RECEIVE_ALL_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const CLEAR_CHANNEL_ERRORS = 'CLEAR_CHANNEL_ERRORS';

export const receiveAllChannels = channels => ({
    type: RECEIVE_ALL_CHANNELS,
    channels
})

export const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
})

export const removeChannel = channelId => ({
    type: REMOVE_CHANNEL,
    channelId
})

export const receiveChannelErrors = errors => ({
    type: RECEIVE_CHANNEL_ERRORS,
    errors
})

export const clearChannelErrors = () => ({
    type: CLEAR_CHANNEL_ERRORS
});



export const fetchChannels = serverId => dispatch => (
    ChannelApiUtil.fetchChannels(serverId).then( channels => (
        dispatch(receiveAllChannels(channels))
    ), (e) => (
        dispatch(receiveChannelErrors(e.responseJSON))
    ))
)

export const fetchChannel = channelId => dispatch => (
    ChannelApiUtil.fetchChannel(channelId).then( channel => (
        dispatch(receiveChannel(channel))
    ), (e) => (
        dispatch(receiveChannelErrors(e.responseJSON))
    ))
)

export const createChannel = channel => dispatch => (
    ChannelApiUtil.createChannel(channel).then( channel => {
        console.log(channel);
        return dispatch(receiveChannel(channel));
    }, (e) => {
        console.log(channel);
        return dispatch(receiveChannelErrors(e.responseJSON))
    })
)

export const updateChannel = channel => dispatch => (
    ChannelApiUtil.updateChannel(channel).then( channel => (
        dispatch(receiveChannel(channel))
    ), (e) => {
        dispatch(receiveChannelErrors(e.responseJSON))
    })
)

export const deleteChannel = channelId => dispatch => (
    ChannelApiUtil.deleteChannel(channelId).then( () => (
        dispatch(removeChannel(channelId))
    ), (e) => (
        dispatch(receiveChannelErrors(e.responseJSON))
    ))
)