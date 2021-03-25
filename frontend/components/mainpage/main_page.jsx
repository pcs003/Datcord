import React from 'react'

import ServerContainer from './servers/server_container'
import { AuthRoute, ProtectedRoute } from '../../util/route_util';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
        let currentServerId = this.props.servers[0] ? this.props.servers[0].id : null;
        this.state = {
            currentServerId: currentServerId
        }
    }

    componentDidMount(){
        this.props.getServers()

    }


    render() {
        
        return (
            <div>
                <ProtectedRoute path="/channels/:server_id/:channel_id" component={ServerContainer} />
                {/* <ProtectedRoute exact path="/channels/@me" component={ServerContainer} /> */}
            </div>
        )
        
    }
}