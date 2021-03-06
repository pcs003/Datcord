import React from 'react'
import Popup from 'react-popup'
import InfoNavbar from './info_navbar'
import SideNav from '../side_nav/side_nav'
import CreateServer from './create_server'
import CurrentUserInfo from './current_user_info'
import ServerSettings from './settings_layers/server_settings'
import UserSettings from './settings_layers/user_settings'
import ChannelIndexContainer from './channels/channel_index_container'
import CreateChannel from './channels/create_channel'
import DeleteChannel from './channels/delete_channel'
import { AuthRoute, ProtectedRoute } from '../../../util/route_util';
import ChannelSettings from './channels/channel_settings'
import ChannelMessagesContainer from './channel_messages/channel_messages_container'
import ProfilePage from './profile/profile_page'

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
        this.openChannelSettings = this.openChannelSettings.bind(this) 
        this.closeChannelSettings = this.closeChannelSettings.bind(this)
        this.unfinished = this.unfinished.bind(this)
        this.getResponseMessage = this.getResponseMessage.bind(this)

        this.state = {
            muted: false,
            deafened: false,
            createServerActive: false,
            layerName: "",
            clickedServerId: "",
            clickedServerName: "",
            currentChannelId: 1,
            currentChannelName: "",
            clickedChannelId: 1,
        }
    }

    componentDidMount() {
        this.props.getServers();
        this.props.getServer(this.props.match.params.server_id)
        this.props.fetchChannels(this.props.match.params.server_id)
        this.props.fetchChannelMessages(this.props.match.params.channel_id)

        let channelId = this.props.channels[this.props.match.params.channel_id];

        App.cable.subscriptions.create(
            { channel: "ChannelMessagesChannel", channelId: channelId},
            {
                received: data => {
                    this.getResponseMessage(data)
                },
                speak: function(data) {
                    return this.perform("speak", data)
                }
            }
        )
    }

    unfinished(e) {
        e.preventDefault();
        Popup.alert("Functionality not yet added")
    }

    getResponseMessage(data) {
        if (this.props.currentUser.id !== data.message.author_id) {
            this.props.receiveChannelMessage({message: data})
        }
        this.props.fetchChannelMessages(this.props.channels.find(channel => {
            return channel.id == this.props.match.params.channel_id
            
        }).id)
        
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

    openChannelSettings(e) {
        if (e) {
            e.preventDefault();
        }
        
        this.setState({
            layerName: "channelSettings",
            // clickedServerId: e.target.id,
            // clickedServerName: this.props.servers.find(server => server.id == e.target.id).name
        })

    }

    closeChannelSettings(e) {
        if (e) {
            e.preventDefault();
        }
        
        let wrapper = document.getElementById("channel-settings-modal-wrapper");

        wrapper.classList.add("inactive");

        setTimeout(() => {
            this.setState({
                layerName: ""
            })
        }, 100);
    }

    
    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]
        let currentServer = this.props.servers.find(server =>{
            return this.props.match.params.server_id == server.id
        })
        let currentChannel = this.props.channels.find(channel => {
            return channel.id == this.props.match.params.channel_id
        })
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
            currentLayer = <CreateServer createChannel={this.props.createChannel} fetchChannels={this.props.fetchChannels} getServers={this.props.getServers} servers={this.props.servers} joinServer={this.props.joinServer} currentUser={this.props.currentUser} history={this.props.history} isActive={this.state.layerName === "createServer"} closeCreateServerForm={this.closeCreateServerForm} createServer={this.props.createServer} /> ;
        } else if (this.state.layerName === "serverSettings") {
            currentLayer = <ServerSettings currentUser={this.props.currentUser} updateServer={this.props.updateServer} clickedServerName={this.state.clickedServerName} getServers={this.props.getServers} servers={this.props.servers} history={this.props.history} clickedServerId={this.state.clickedServerId} deleteServer={this.props.deleteServer} closeServerSettings={this.closeServerSettings} />
        } else if (this.state.layerName === "userSettings") {
            currentLayer = <UserSettings closeUserSettings={this.closeUserSettings} logout={this.props.logout} currentUser={this.props.currentUser}/>
        } else if (this.state.layerName === "createChannel") {
            currentLayer = <CreateChannel currentServer={currentServer} history={this.props.history} fetchChannels={this.props.fetchChannels} createChannel={this.props.createChannel} match={this.props.match} closeForm={this.closeCreateChannelForm} />
        } else if (this.state.layerName === "deleteChannel") {
            currentLayer = <DeleteChannel currentServer={currentServer} history={this.props.history} fetchChannels={this.props.fetchChannels} clickedChannelId={this.state.clickedChannelId} deleteChannel={this.props.deleteChannel} closeForm={this.closeDeleteChannelForm}/>
        } else if (this.state.layerName === "channelSettings") {
            currentLayer = <ChannelSettings getServer={this.props.getServer} match={this.props.match} currentChannel={this.props.channel} openDeleteChannelForm={this.openDeleteChannelForm} currentServer={currentServer} fetchChannels={this.props.fetchChannels} updateChannel={this.props.updateChannel} clickedChannelId={this.state.clickedChannelId} closeChannelSettings={this.closeChannelSettings}/>
        }

        //handles user vs server page
        let serverPage = (
            <div className="server-container">
                <div className="server-channel-nav">
                    <div className="server-name">
                        <h2>{currentServerName}</h2>
                    </div>
                    <ChannelIndexContainer openChannelSettings={this.openChannelSettings} setClickedChannelId={this.setClickedChannelId} openDeleteChannelForm={this.openDeleteChannelForm} openCreateChannelForm={this.openCreateChannelForm} currentServer={currentServer} currentChannelId={this.state.currentChannelId} setCurrentChannelInfo={this.setCurrentChannelInfo} history={this.props.history} match={this.props.match} />
                    {/* <ProtectedRoute path="/channels/:server_id/:channel_id" render={(props) => <ChannelIndexContainer {...props} setClickedChannelId={this.setClickedChannelId} openDeleteChannelForm={this.openDeleteChannelForm} openCreateChannelForm={this.openCreateChannelForm} currentServer={currentServer} currentChannelId={this.state.currentChannelId} setCurrentChannelInfo={this.setCurrentChannelInfo} history={this.props.history} match={this.props.match} />}/> */}
                    <CurrentUserInfo openUserSettings={this.openUserSettings} muted={this.state.muted} deafened={this.state.deafened} currentUser={this.props.currentUser} toggleDeafen={this.toggleDeafen} toggleMute={this.toggleMute} />
                </div>
                <div className="right-div">
                    <InfoNavbar currentChannel={currentChannel} unfinished={this.unfinished}/>
                    <div className="messages-users-div">

                        <ChannelMessagesContainer servers={this.props.servers} currentServer={currentServer} currentChannel={currentChannel} match={this.props.match}/>

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
            <ProfilePage 
                openUserSettings={this.openUserSettings} 
                muted={this.state.muted} 
                deafened={this.state.deafened} 
                currentUser={this.props.currentUser} 
                toggleDeafen={this.toggleDeafen} 
                toggleMute={this.toggleMute}
                addFriend={this.props.addFriend}
                removeFriend={this.props.removeFriend}
                acceptFriend={this.props.acceptFriend}
                errors={this.props.errors}
                fetchPrivateMessages={this.props.fetchPrivateMessages}
                match={this.props.match}
                history={this.props.history}
                privateMessages={this.props.privateMessages}
                createPrivateMessage={this.props.createPrivateMessage}
                receivePrivateMessage={this.props.receivePrivateMessage}
                updatePrivateMessage={this.props.updatePrivateMessage}
                deletePrivateMessage={this.props.deletePrivateMessage}
            />
        )

        let currentPage = this.props.match.params.server_id == "@me" ? userPage : serverPage;

        return (
            <div className="outmost">
                <div className="discord-page">
                    <SideNav fetchChannelMessages={this.props.fetchChannelMessages} setCurrentChannelInfo={this.setCurrentChannelInfo} match={this.props.match} fetchChannels={this.props.fetchChannels} history={this.props.history} openServerSettings={this.openServerSettings} leaveServer={this.props.leaveServer} currentUser={this.props.currentUser} currentServerId={currentServerId} openCreateServerForm={this.openCreateServerForm} servers={this.props.servers} getServers={this.props.getServers}/>
                    
                    {currentPage}
                </div>
                <div className="layer-wrapper">
                    {currentLayer}
                </div>
                <Popup />
            </div>
        )
    }
}