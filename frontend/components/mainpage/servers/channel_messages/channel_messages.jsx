import React from 'react'
import ChannelMessageForm from './channel_mesage_form'

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
                    this.getResponseMessage(data)
                    this.getChannelMessages(channelId)
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

            this.props.createChannelMessage(data)
        }
    }

    render() {
        const messageListItems = this.props.channelMessages.map(message => {
            return (
                <li key={message.id}>
                    {message.body}
                    <div ref={this.bottom} />
                </li>
            )
        })
        return (
            <div className="messages-wrapper">
                <div>Welcome to {this.props.currentChannelName}'s messages</div>
                <div className="messages-display">
                    <ul>
                        {messageListItems}
                    </ul>
                </div>
                <ChannelMessageForm getChannelMessages={this.props.getChannelMessages} currentUser={this.props.currentUser} match={this.props.match}/>
            </div>
            
        )
    }
}