import { connect } from 'react-redux';
import { createChannelMessage, deleteChannelMessage, fetchChannelMessages, updateChannelMessage } from '../../../../actions/channel_message_actions';
import { fetchServers } from '../../../../actions/server_actions';
import ChannelMessages from './channel_messages'

const mapStateToProps = (state, ownProps) => {

    let currentServer = {};
    if (state.entities.servers) {
        currentServer = Object.values(state.entities.servers).find(server => {
            server.id == ownProps.match.params.server_id
        })
    }

    return {
        currentUser: state.entities.users[state.session.id],
        users: state.entities.users,
        server: currentServer,
        channels: state.entities.channels,
        errors: state.errors.channelMessage,
        channelMessages: Object.values(state.entities.channelMessages).filter(message => {
            return message.channel_id == ownProps.match.params.channel_id
        })
    }
}

const mapDispatchToProps = dispatch => ({
    getChannelMessages: channelId => dispatch(fetchChannelMessages(channelId)),
    createChannelMessage: channelMessage => {
        console.log("creating message")
        return dispatch(createChannelMessage(channelMessage))
    },
    updateChannelMessage: channelMessage => dispatch(updateChannelMessage(channelMessage)),
    deleteChannelMessage: channelMessageId => dispatch(deleteChannelMessage(channelMessageId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMessages)