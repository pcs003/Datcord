export const fetchPrivateMessages = (recipientId) => (
    $.ajax ({
        url: '/api/private_messages',
        method: 'GET',
        data: { recipientId }
    })
)

export const createPrivateMessage = (message) => {
    return $.ajax ({
        url: '/api/private_messages',
        method: 'POST',
        data: message
    })
}

export const updatePrivateMessage = message => (
    $.ajax({
        url: `/api/private_messages/${message.id}`,
        method: 'PATCH',
        data: message
    })
)

export const deletePrivateMessage = messageId => (
    $.ajax ({
        url: `/api/private_messages/${messageId}`,
        method: 'DELETE'
    })
)