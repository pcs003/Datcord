export const fetchChannels = (serverId) => (
    $.ajax({
        url: '/api/channels',
        data: { serverId }
    })
)

export const fetchChannel = channelId => (
    $.ajax({
        url: `/api/channels/${channelId}`,
    })
)

export const createChannel = ({ name,serverId,channelType }) => (
    $.ajax({
        url: '/api/channels',
        method: 'POST',
        data: { channel: { name: name, server_id: serverId, channel_type: channelType }}
    })
)

export const updateChannel = channel => {
    return $.ajax({
        url: `/api/channels/${channel.id}`,
        method: 'PATCH',
        data: { channel }
    })
}


export const deleteChannel = channelId => (
    $.ajax({
        url: `/api/channels/${channelId}`,
        method: 'DELETE'
    })
)