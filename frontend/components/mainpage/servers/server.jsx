import React from 'react'
import InfoNavbar from './info_navbar'
import SideNav from '../side_nav/side_nav'
import CreateServer from './create_server'
import CurrentUserInfo from './current_user_info'
import ServerSettings from './settings_layers/server_settings'
import UserSettings from './settings_layers/user_settings'
import ChannelIndexContainer from './channels/channel_index_container'
import CreateChannel from './channels/create_channel'
import DeleteChannel from './channels/delete_channel'

export default class Server extends React.Component {
    constructor(props) {
        super(props)

        this.sortMembersByUsername = this.sortMembersByUsername.bind(this)
        this.toggleMute = this.toggleMute.bind(this)
        this.toggleDeafen = this.toggleDeafen.bind(this)
        this.openCreateServerForm = this.openCreateServerForm.bind(this)
        this.closeCreateServerForm = this.closeCreateServerForm.bind(this)
        this.openServerSettings = this.openServerSettings.bind(this)
        this.closeServerSettings = this.closeServerSettings.bind(this)
        this.openUserSettings = this.openUserSettings.bind(this)
        this.closeUserSettings = this.closeUserSettings.bind(this)
        this.setCurrentChannelInfo = this.setCurrentChannelInfo.bind(this)
        this.openCreateChannelForm = this.openCreateChannelForm.bind(this)
        this.closeCreateChannelForm = this.closeCreateChannelForm.bind(this)
        this.openDeleteChannelForm = this.openDeleteChannelForm.bind(this)
        this.closeDeleteChannelForm = this.closeDeleteChannelForm.bind(this)
        this.setClickedChannelId = this.setClickedChannelId.bind(this)

        this.state = {
            muted: false,
            deafened: false,
            createServerActive: false,
            layerName: "",
            clickedServerId: "",
            clickedServerName: "",
            currentChannelId: 1,
            currentChannelName: "",
            clickedChannelId: 1
        }
    }
    componentDidMount() {
        this.props.getServers();
        this.props.getServer(this.props.match.params.server_id)
    }

    sortMembersByUsername(a, b) {
        if (a.username < b.username) {
            return -1;
        }
        if (a.username > b.username) {
            return 1;
        }
        return 0;
    }

    toggleMute(e){
        e.preventDefault();
        if (this.state.muted) {
            this.setState({
                muted: false
            })
        } else {
            this.setState({
                muted: true
            })
        }
    }

    toggleDeafen(e) {
        e.preventDefault();
        if (this.state.deafened) {
            this.setState({
                deafened: false
            })
        } else {
            this.setState({
                deafened: true
            })
        }
    }

    openCreateServerForm(e) {
        e.preventDefault();
        this.setState({
            layerName: "createServer"
        })
    }

    closeCreateServerForm(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("create-server-modal-wrapper");
        let modal = document.getElementById("create-server-modal");

        modal.classList.add("transition-out");
        wrapper.classList.add("inactive")

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    openServerSettings(e) {
        e.preventDefault();
        this.setState({
            layerName: "serverSettings",
            clickedServerId: e.target.id,
            clickedServerName: this.props.servers.find(server => server.id == e.target.id).name
        })

    }

    closeServerSettings(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("server-settings-modal-wrapper");

        wrapper.classList.add("inactive");

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    

    openUserSettings(e) {
        e.preventDefault();
        this.setState({
            layerName: "userSettings"
        })
    }

    closeUserSettings(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("user-settings-modal-wrapper");

        wrapper.classList.add("inactive");

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    setCurrentChannelInfo(name, id) {
        this.setState({
            currentChannelName: name,
            currentChannelId: id
        })
    }

    openCreateChannelForm(e) {
        e.preventDefault();
        e.preventDefault();
        this.setState({
            layerName: "createChannel"
        })
    }

    closeCreateChannelForm(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("create-channel-modal-wrapper");
        let modal = document.getElementById("create-channel-modal");

        modal.classList.add("transition-out");
        wrapper.classList.add("inactive")

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    openDeleteChannelForm(e) {
        e.preventDefault();
        console.log("here")
        this.setState({
            layerName: "deleteChannel"
        })
    }

    closeDeleteChannelForm(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("delete-channel-modal-wrapper");
        let modal = document.getElementById("delete-channel-modal");

        modal.classList.add("transition-out");
        wrapper.classList.add("inactive")

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    setClickedChannelId(num) {
        this.setState({
            clickedChannelId: num
        })
    }

    
    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]
        let currentServer = this.props.servers[this.props.match.params.server_id - 1]
        let currentServerName = currentServerName != "" ? currentServerName : "";
        let memberListElements = "";
        let currentServerId = -1;
        if (this.props.server) {
            currentServerName = this.props.server.name
            currentServerId = this.props.server.id

            memberListElements = this.props.server.members.sort(this.sortMembersByUsername).map((member, i) => {
                let thisColor = colors[member.id % colors.length];
                
                return (
                    <div className="user-list-item" key={i}>
                        <div className="user-list-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <h2>{member.username}</h2>
                    </div>
                )
            })
        }

        //this handles the layer selection
        let currentLayer = ""
        if (this.state.layerName === "createServer"){
            currentLayer = <CreateServer getServers={this.props.getServers} servers={this.props.servers} joinServer={this.props.joinServer} currentUser={this.props.currentUser} history={this.props.history} isActive={this.state.layerName === "createServer"} closeCreateServerForm={this.closeCreateServerForm} createServer={this.props.createServer} /> ;
        } else if (this.state.layerName === "serverSettings") {
            currentLayer = <ServerSettings updateServer={this.props.updateServer} clickedServerName={this.state.clickedServerName} getServers={this.props.getServers} servers={this.props.servers} history={this.props.history} clickedServerId={this.state.clickedServerId} deleteServer={this.props.deleteServer} closeServerSettings={this.closeServerSettings} />
        } else if (this.state.layerName === "userSettings") {
            currentLayer = <UserSettings closeUserSettings={this.closeUserSettings} logout={this.props.logout} currentUser={this.props.currentUser}/>
        } else if (this.state.layerName === "createChannel") {
            currentLayer = <CreateChannel history={this.props.history} fetchChannels={this.props.fetchChannels} createChannel={this.props.createChannel} match={this.props.match} closeForm={this.closeCreateChannelForm} />
        } else if (this.state.layerName === "deleteChannel") {
            currentLayer = <DeleteChannel fetchChannels={this.props.fetchChannels} clickedChannelId={this.state.clickedChannelId} deleteChannel={this.props.deleteChannel} closeForm={this.closeDeleteChannelForm}/>
        }

        //handles user vs server page
        let serverPage = (
            <div className="server-container">
                <div className="server-channel-nav">
                    <div className="server-name">
                        <h2>{currentServerName}</h2>
                    </div>
                    <ChannelIndexContainer setClickedChannelId={this.setClickedChannelId} openDeleteChannelForm={this.openDeleteChannelForm} openCreateChannelForm={this.openCreateChannelForm} currentServer={currentServer} currentChannelId={this.state.currentChannelId} setCurrentChannelInfo={this.setCurrentChannelInfo} match={this.props.match}/>
                    <CurrentUserInfo openUserSettings={this.openUserSettings} muted={this.state.muted} deafened={this.state.deafened} currentUser={this.props.currentUser} toggleDeafen={this.toggleDeafen} toggleMute={this.toggleMute} />
                </div>
                <div className="right-div">
                    <InfoNavbar currentChannelName={this.state.currentChannelName}/>
                    <div className="messages-users-div">
                        <div className="messaging-div"></div>
                        <div className="server-members-nav">
                            <h2 className="members-header">MEMBERS&mdash;{memberListElements.length}</h2>
                            {memberListElements}
                            <div className="user-list-item invis">
                                <div className="user-list-pic" >
                                </div>
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        let userPage = (
            <div className="server-container">
                <div className="server-channel-nav">
                    <div className="server-name">
                        <h2></h2>
                    </div>
                    <div className="channel-nav">
                        
                    </div>
                    <CurrentUserInfo openUserSettings={this.openUserSettings} muted={this.state.muted} deafened={this.state.deafened} currentUser={this.props.currentUser} toggleDeafen={this.toggleDeafen} toggleMute={this.toggleMute} />
                </div>
                <div className="right-div">
                    <div className="info-navbar">
                        This page is in progress, it will be the private messaging page
                    </div>
                    <div className="messages-users-div">
                        <div className="messaging-div"></div>
                        <div className="server-members-nav">
                            <h2 className="members-header"></h2>
                            
                            <div className="user-list-item invis">
                                <div className="user-list-pic" >
                                </div>
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        let currentPage = this.props.match.params.server_id == "@me" ? userPage : serverPage;


        return (
            <div className="outmost">
                <div className="discord-page">
                    <SideNav setCurrentChannelInfo={this.setCurrentChannelInfo} match={this.props.match} fetchChannels={this.props.fetchChannels} history={this.props.history} openServerSettings={this.openServerSettings} leaveServer={this.props.leaveServer} currentUser={this.props.currentUser} currentServerId={currentServerId} openCreateServerForm={this.openCreateServerForm} servers={this.props.servers} getServers={this.props.getServers}/>
                    
                    {currentPage}
                </div>
                <div className="layer-wrapper">
                    {currentLayer}
                </div>
            </div>
        )
    }
}