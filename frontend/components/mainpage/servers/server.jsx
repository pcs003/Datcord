import React from 'react'
import InfoNavbar from './info_navbar'

export default class Server extends React.Component {
    constructor(props) {
        super(props)

        this.sortMembersByUsername = this.sortMembersByUsername.bind(this)

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

        let thisColor = colors[this.props.currentUser.id % colors.length];

        return (
            <div className="server-container">
                <div className="server-channel-nav">
                    <div className="server-name">
                        <h2>{currentServerName}</h2>
                    </div>
                    <div className="channel-nav">
                        
                    </div>
                    <div className="current-user">
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="user-info">
                            <div className="current-user-name">{this.props.currentUser.username}</div>
                            <div className="current-user-number">#{this.props.currentUser.id}</div>
                        </div>
                        
                    </div>
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
        )
    }
}