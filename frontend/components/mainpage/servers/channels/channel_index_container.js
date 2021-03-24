import { connect } from "react-redux"
import { createChannel, updateChannel, deleteChannel, fetchChannel, fetchChannels } from "../../../../actions/channel_actions"
import ChannelIndex from './channel_index'
import { fetchServers } from "../../../../actions/server_actions"

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.channel,
        channels: Object.values(state.entities.channels),
        currentUser: state.entities.users[state.session.id],
        server: Object.values(state.entities.servers).find(server => {
            return server.id == ownProps.match.params.server_id
        }),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createChannel: channel => dispatch(createChannel(channel)),
        updateChannel: channel => dispatch(updateChannel(channel)),
        deleteChannel: channelId => dispatch(deleteChannel(channelId)),
        fetchChannels: serverId => dispatch(fetchChannels(serverId)),
        fetchChannel: channelId => dispatch(fetchChannel(channelId)),
        fetchServers: () => dispatch(fetchServers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelIndex)