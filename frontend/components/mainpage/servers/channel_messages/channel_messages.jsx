import React from 'react'
import ChannelMessageForm from './channel_message_form'
import * as Util from '../../../../util/general_util'

export default class ChannelMessages extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }

        this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];


        this.bottom = React.createRef();
    }

    componentDidUpdate() {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView(false);
        }
        
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]
        

        let thisServer = this.props.servers.find(server => {
            return this.props.match.params.server_id == server.id 
        })

        let serverMembers = []
        if (thisServer) {
            serverMembers = thisServer.members
        }

        const messageListItems = []

        
        this.props.channelMessages
        .sort( (a,b) => {
            if (a.created_at > b.created_at) {
                return 1
            } else {
                return -1
            }

        })
        .forEach((message,i) => {
            let author = serverMembers.find(member => {
                return member.id == message.author_id
            })
            let thisColor=""
            let authorName="";
            if (author) {
                authorName = author.username;
                thisColor = colors[author.id % colors.length];
            }
            if (i == 0) {
                let date = new Date()
                if (message.created_at) {
                    date = new Date(message.created_at)
                }
    
                
                messageListItems.push(
                    <div className="date-divider">
                        <div className="line"></div>
                        <h2>{this.monthNames[parseInt(date.getMonth())] + " " + date.getDate() + ", " + date.getFullYear()}</h2>
                    </div>
                )
            }
            

            if (i >= 1) {
                let prevDay = new Date().getDay()
                if (this.props.channelMessages[i - 1].created_at) {
                    prevDay = this.props.channelMessages[i - 1].created_at.slice(8,10)
                }
                
                var msgD = new Date().getDate();
                if (message.created_at) {
                    msgD = parseInt(message.created_at.slice(8,10))
                }
                
                if (msgD != prevDay) {

                    let date = new Date()
                    if (message.created_at) {
                        date = new Date(message.created_at)
                    }

                    
                    messageListItems.push(
                        <div className="date-divider">
                            <div className="line"></div>
                            <h2>{this.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}</h2>
                        </div>
                    )
                }
            }


            if (i >= 1 && this.props.channelMessages[i - 1].author_id === message.author_id) {
                let prevDay = new Date().getDate()
                if (this.props.channelMessages[i - 1].created_at) {
                    prevDay = this.props.channelMessages[i - 1].created_at.slice(8,10)
                }
                
                var msgD = new Date().getDate();
                if (message.created_at) {
                    msgD = parseInt(message.created_at.slice(8,10))
                }
                
        
                messageListItems.push(
                    <li className="repeat" key={message.id} >
                        <div className="message-info">
                            <span className="timestamp">{Util.generateTimeStampRepeat(message.created_at)}</span>
                            <h3>{message.body}</h3>
                        </div>
                    </li>
                );
                
            } else {
                messageListItems.push(
                    <li key={message.id} >
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{authorName} <span className="timestamp">{Util.generateTimeStamp(message.created_at)}</span></h2>
                            <h3>{message.body}</h3>
                        </div>
                        
                    </li>
                )
            }
            
        })

        let thisChannel = this.props.currentChannel || {name:""}

        return (
            <div className="messaging-div">
                <div className="all-messages-wrapper">
                    <ul>
                        {messageListItems}
                        <div ref={this.bottom} />
                    </ul>
                    
                </div>
                <ChannelMessageForm createChannelMessage={this.props.createChannelMessage} currentChannel={thisChannel} getChannelMessages={this.props.getChannelMessages} currentUser={this.props.currentUser} match={this.props.match}/>
            </div>
            
        )
    }
}