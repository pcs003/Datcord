import React from 'react'
import SideNav from './side_nav/side_nav'
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
            <div className="discord-page">
                <SideNav servers={this.props.servers} getServers={this.props.getServers}/>
                
                {/* <ServerContainer /> */}

                <ProtectedRoute path="/channels/:server_id" component={ServerContainer} />
            </div>
        )
        
    }
}