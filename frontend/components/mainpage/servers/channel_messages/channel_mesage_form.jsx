import React from "react";

export default class ChannelMessageForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            body: "" 
        }

        this.updateBody = this.updateBody.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    updateBody(e) {
        e.preventDefault();
        this.setState({ 
            body: e.target.value 
        });
        console.log(e.target.value)
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("IN THE HANDLE SUBMIT")
        App.cable.subscriptions.subscriptions[0].speak({ 
            body: this.state.body,
            authorId: this.props.currentUser.id,
            channelId: this.props.match.params.channel_id
        });
        this.setState({ body: "" });
        document.getElementById("chat-input").value = ""
        this.props.getChannelMessages(this.props.match.params.channel_id).then((action) => {
            console.log(action.channelMessages)
        })
    }
    
    render() {
        return (
        <div>
            <input
                id="chat-input"
                type="text"
                onChange={this.updateBody}
                placeholder="Type message here"
            />
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
        );
    }
}