import React from 'react'
import InfoNavbar from './info_navbar'
import SideNav from '../side_nav/side_nav'
import CreateServer from './create_server'
import CurrentUserInfo from './current_user_info'

export default class Server extends React.Component {
    constructor(props) {
        super(props)

        this.sortMembersByUsername = this.sortMembersByUsername.bind(this)
        this.toggleMute = this.toggleMute.bind(this)
        this.toggleDeafen = this.toggleDeafen.bind(this)
        this.openCreateServerForm = this.openCreateServerForm.bind(this)
        this.closeCreateServerForm = this.closeCreateServerForm.bind(this)

        this.state = {
            muted: false,
            deafened: false,
            createServerActive: false
        }
    }
    componentDidMount() {
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
            createServerActive: true
        })
    }

    closeCreateServerForm(e) {
        e.preventDefault();
        let wrapper = document.getElementById("create-server-modal-wrapper");
        let modal = document.getElementById("create-server-modal");

        modal.classList.add("transition-out");
        wrapper.classList.add("inactive")

        setTimeout(() => {
            this.setState({
                createServerActive: false
            })
        }, 100);
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]

        let currentServerName = currentServerName != "" ? currentServerName : "";
        let memberListElements = "";
        if (this.props.server) {
            currentServerName = this.props.server.name

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

        //this handles the create server form layer
        let createServerLayer = this.state.createServerActive ? <CreateServer isActive={this.state.createServerActive} closeCreateServerForm={this.closeCreateServerForm} /> : "";

        return (
            <div className="outmost">
                <div className="discord-page">
                    <SideNav openCreateServerForm={this.openCreateServerForm} servers={this.props.servers} getServers={this.props.getServers}/>
                    <div className="server-container">
                        <div className="server-channel-nav">
                            <div className="server-name">
                                <h2>{currentServerName}</h2>
                            </div>
                            <div className="channel-nav">
                                
                            </div>
                            <CurrentUserInfo muted={this.state.muted} deafened={this.state.deafened} currentUser={this.props.currentUser} toggleDeafen={this.toggleDeafen} toggleMute={this.toggleMute} />
                        </div>
                        <div className="right-div">
                            <InfoNavbar />
                            <div className="messages-users-div">
                                <div className="messaging-div"></div>
                                <div className="server-members-nav">
                                    <button className="logout" onClick={this.props.logout}>Log Out</button>
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
                    
                </div>
                <div className="layer-wrapper">
                    {createServerLayer}
                </div>
            </div>
        )
    }
}