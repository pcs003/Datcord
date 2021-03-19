import { connect } from "react-redux"
import { createServer, updateServer, fetchServers, fetchServer } from "../../../actions/server_actions"
import { logout } from "../../../actions/session_actions"
import Server from "./server"


const mapStateToProps = (state, ownProps) => ({
    errors: state.errors.server,
    server: state.entities.servers[ownProps.match.params.server_id-1],
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    createServer: server => dispatch(createServer(server)),
    updateServer: server => dispatch(updateServer(server)),
    getServers: () => dispatch(fetchServers()),
    getServer: serverId => dispatch(fetchServer(serverId)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Server)