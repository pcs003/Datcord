import { connect } from "react-redux"
import { createServer, updateServer, fetchServers, fetchServer } from "../../actions/server_actions"
import { logout } from "../../actions/session_actions"
import MainPage from "./main_page"


const mapStateToProps = state => ({
    errors: state.errors.server,
    servers: Object.values(state.entities.servers),
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    createServer: server => dispatch(createServer(server)),
    updateServer: server => dispatch(updateServer(server)),
    getServers: () => dispatch(fetchServers()),
    getServer: serverId => dispatch(fetchServer(serverId)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)