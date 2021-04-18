export const signup = (user) => {
    return $.ajax({
        method: 'POST',
        url: '/api/users',
        data: {user}
    })
}

export const login = (user) => {
    return $.ajax({
        method: 'POST',
        url: '/api/session',
        data: {user},
    })
}

export const logout = () => {
    return $.ajax({
        method: 'DELETE',
        url: '/api/session',
    })
}

export const addFriend = friendee_id => {
    return $.ajax({
        method: 'POST',
        url: '/api/users/add',
        data: { friendee_id }
    })
}

export const acceptFriend = friendship_id => {
    return $.ajax({
        method: 'PATCH',
        url: '/api/users/accept',
        data: { friendship_id }
    })
}

export const removeFriend = friend_id => {
    return $.ajax({
        method: 'DELETE',
        url: '/api/users',
        data: { friend_id }
    })
}