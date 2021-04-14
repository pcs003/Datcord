import { connect } from "react-redux"
import { createServer, updateServer, fetchServers, fetchServer, joinServer, leaveServer, deleteServer } from "../../../actions/server_actions"
import { logout } from "../../../actions/session_actions"
import Server from "./server"
import { createChannel, deleteChannel, fetchChannel, fetchChannels, updateChannel } from '../../../actions/channel_actions'
import { fetchChannelMessages, receiveChannelMessage } from "../../../actions/channel_message_actions"



const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.server,
        channels: Object.values(state.entities.channels),
        servers: Object.values(state.entities.servers),
        server: Object.values(state.entities.servers).find(server => {
            return server.id == ownProps.match.params.server_id
        }),
        currentUser: state.entities.users[state.session.id]
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
        receiveChannelMessage: channelMessage => dispatch(receiveChannelMessage(channelMessage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Server)