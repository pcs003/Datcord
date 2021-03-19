import * as ServerApiUtil from '../util/server_api_util'
import React from 'react'

export const RECEIVE_ALL_SERVERS = 'RECEIVE_ALL_SERVERS'
export const RECEIVE_SERVER = 'RECEIVE_SERVER'
export const REMOVE_SERVER = "REMOVE_SERVER"
export const RECEIVE_SERVER_ERRORS = 'RECEIVE_SERVER_ERRORS'
export const CLEAR_SERVER_ERRORS = 'CLEAR_SERVER_ERRORS'

export const receiveAllServers = servers => ({
    type: RECEIVE_ALL_SERVERS,
    servers
})

export const receiveServer = server => ({
    type: RECEIVE_SERVER,
    server
})

export const removeServer = serverId => ({
    type: REMOVE_SERVER,
    serverId
})

export const receiveServerErrors = errors => ({
    type: RECEIVE_SERVER_ERRORS,
    errors
})

export const clearServerErrors = () => ({
    type: CLEAR_SERVER_ERRORS
})

export const fetchServers = () => dispatch => (
    ServerApiUtil.fetchServers().then(servers => (
        dispatch(receiveAllServers(servers))
    ), (e) => (
        dispatch(receiveServerErrors(e.responseJSON))
    ))
)

export const fetchServer = serverId => dispatch => (
    ServerApiUtil.fetchServer(serverId).then(server => (
        dispatch(receiveServer(server))
    ), (e) => (
        dispatch(receiveServerErrors(e.responseJSON))
    ))
)

export const createServer = server => dispatch => (
    ServerApiUtil.createServer(server).then(server => (
        dispatch(receiveServer(server))
    ), (e) => (
        dispatch(receiveServerErrors(e.responseJSON))
    ))
)

export const updateServer = server => dispatch => (
    ServerApiUtil.updateServer(server).then(server => (
        dispatch(receiveServer(server))
    ), (e) => (
        dispatch(receiveServerErrors(e.responseJSON))
    ))
)

export const deleteServer = serverId => dispatch => (
    ServerApiUtil.deleteServer(serverId).then(() => dispatch(removeServer(serverId)))
)
