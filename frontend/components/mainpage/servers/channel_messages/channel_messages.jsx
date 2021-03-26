import React from 'react'
import ChannelMessageForm from './channel_message_form'

export default class ChannelMessages extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }

        this.getResponseMessage = this.getResponseMessage.bind(this)

        this.bottom = React.createRef();
    }

    componentDidMount() {
        let channelId = this.props.channels[this.props.match.params.channel_id];

        App.cable.subscriptions.create(
            { channel: "ChannelMessagesChannel", channelId: channelId},
            {
                received: data => {
                    // this.getResponseMessage(data)
                    this.getResponseMessage(data)
                },
                speak: function(data) {
                    return this.perform("speak", data)
                }
            }
        )

    }

    componentDidUpdate() {
        // this.bottom.current.scrollIntoView();
    }

    getResponseMessage(data) {
        if (this.props.currentUser.id !== data.message.author_id) {

            this.props.receiveChannelMessage({message: data})
        }
        this.props.getChannelMessages(this.props.channels[this.props.match.params.channel_id].id)
        
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]
        

        let thisServer = this.props.servers.find(server => {
            return this.props.match.params.server_id == server.id 
        })
        let serverMembers = []
        if (thisServer) {
            serverMembers = thisServer.members
            console.log(serverMembers)
        }
        const messageListItems = this.props.channelMessages.map((message,i) => {
            let author = serverMembers.find(member => {
                return member.id == message.author_id
            })
            let thisColor=""
            let authorName="";
            if (author) {
                authorName = author.username;
                thisColor = colors[author.id % colors.length];
            }

            if (i >= 1) {
                if (this.props.channelMessages[i - 1].author_id === message.author_id) {
                    console.log("repeat")
                    return (
                        <li className="repeat" key={message.id}>
                            <div className="message-info">
                                <h3>{message.body}</h3>
                            </div>
                            <div ref={this.bottom} />
                        </li>
                    )
                }
            }
            return (
                <li key={message.id}>
                    <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                        <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                    </div>
                    <div className="message-info">
                        <h2>{authorName}</h2>
                        <h3>{message.body}</h3>
                    </div>
                    <div ref={this.bottom} />
                </li>
            )
        })

        let thisChannel = this.props.currentChannel || {name:""}
        return (
            <div className="messaging-div">
                <div className="all-messages-wrapper">
                    <ul>
                        {messageListItems}
                    </ul>
                </div>
                <ChannelMessageForm createChannelMessage={this.props.createChannelMessage} currentChannel={thisChannel} getChannelMessages={this.props.getChannelMessages} currentUser={this.props.currentUser} match={this.props.match}/>
            </div>
            
        )
    }
}