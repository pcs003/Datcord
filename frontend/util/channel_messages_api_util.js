export const fetchChannelMessages = (channelId) => (
    $.ajax ({
        url: '/api/channel_messages',
        method: 'GET',
        data: { channelId }
    })
)

export const createChannelMessage = (message) => {
    return $.ajax ({
        url: '/api/channel_messages',
        method: 'POST',
        data: message
    })
}

export const updateChannelMessage = message => (
    $.ajax({
        url: `/api/channel_messages/${message.id}`,
        method: 'PATCH',
        data: message
    })
)

export const deleteChannelMessage = messageId => (
    $.ajax ({
        url: `/api/channel_messages/${messageId}`,
        method: 'DELETE'
    })
)