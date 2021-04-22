import { connect } from "react-redux"
import { createServer, updateServer, fetchServers, fetchServer, joinServer, leaveServer, deleteServer } from "../../../actions/server_actions"
import { acceptFriend, addFriend, logout, removeFriend } from "../../../actions/session_actions"
import Server from "./server"
import { createChannel, deleteChannel, fetchChannel, fetchChannels, updateChannel } from '../../../actions/channel_actions'
import { fetchChannelMessages, receiveChannelMessage } from "../../../actions/channel_message_actions"
import { createPrivateMessage, deletePrivateMessage, fetchPrivateMessages, receivePrivateMessage, updatePrivateMessage } from "../../../actions/private_message_actions"



const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.server,
        channels: Object.values(state.entities.channels),
        servers: Object.values(state.entities.servers),
        server: Object.values(state.entities.servers).find(server => {
            return server.id == ownProps.match.params.server_id
        }),
        currentUser: state.entities.users[state.session.id],
        privateMessages: Object.values(state.entities.privateMessages)
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        createServer: server => dispatch(createServer(server)),
        updateServer: server => dispatch(updateServer(server)),
        deleteServer: serverId => dispatch(deleteServer(serverId)),
        joinServer: inviteCode => dispatch(joinServer(inviteCode)),
        leaveServer: serverId => dispatch(leaveServer(serverId)),
        getServers: () => dispatch(fetchServers()),
        getServer: serverId => dispatch(fetchServer(serverId)),
        logout: () => dispatch(logout()),
        fetchChannels: serverId => dispatch(fetchChannels(serverId)),
        createChannel: channel => dispatch(createChannel(channel)),
        deleteChannel: channelId => dispatch(deleteChannel(channelId)),
        updateChannel: channel => dispatch(updateChannel(channel)),
        fetchChannel: channelId => dispatch(fetchChannel(channelId)),
        fetchChannelMessages: channelId => dispatch(fetchChannelMessages(channelId)),
        receiveChannelMessage: channelMessage => dispatch(receiveChannelMessage(channelMessage)),
        addFriend: friendee_id => dispatch(addFriend(friendee_id)),
        removeFriend: friend_id => dispatch(removeFriend(friend_id)),
        acceptFriend: friendship_id => dispatch(acceptFriend(friendship_id)),
        fetchPrivateMessages: recipientId => dispatch(fetchPrivateMessages(recipientId)),
        receivePrivateMessage: privateMessage => dispatch(receivePrivateMessage(privateMessage)),
        createPrivateMessage: privateMessage => dispatch(createPrivateMessage(privateMessage)),
        updatePrivateMessage: privateMessage => dispatch(updatePrivateMessage(privateMessage)),
        deletePrivateMessage: privateMessageId => dispatch(deletePrivateMessage(privateMessageId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)