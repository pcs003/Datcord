import React, { Component } from 'react'

export default class PrivateMessageForm extends Component {
    constructor(props) {
        super(props)

        this.updateBody = this.updateBody.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            body: ""
        }
    }

    updateBody(e) {
        e.preventDefault();
        this.setState({
            body: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            
            this.props.createPrivateMessage({message:{
                body: this.state.body,
                sender_id: this.props.currentUser.id,
                recipient_id: this.props.match.params.channel_id
            }}).then(() => {
                this.props.fetchPrivateMessages(this.props.match.params.channel_id)
            })


            App.cable.subscriptions.subscriptions.find(sub => {
                return sub.identifier.includes("PrivateMessagesChannel")
            }).speak({ 
                body: this.state.body,
                senderId: this.props.currentUser.id,
                recipientId: this.props.match.params.channel_id
            });
            this.setState({ body: "" });
            // document.getElementById("chat-input").value = ""

            
            

        }
    }

    render() {
        let placeholder = `Message @${this.props.currentUser.friends.find(friend => friend.id == parseInt(this.props.page)).username}`

        return (
            <div className="message-input-div">
                <svg onClick={this.props.unfinished} className="add-file" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#b9bbbe" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path>    
                </svg>
                <input
                    id="chat-input"
                    type="text"
                    value={this.state.body}
                    onChange={this.updateBody}
                    onKeyDown={this.handleSubmit}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                <svg onClick={this.props.unfinished} className="" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#b9bbbe" d="M16.886 7.999H20C21.104 7.999 22 8.896 22 9.999V11.999H2V9.999C2 8.896 2.897 7.999 4 7.999H7.114C6.663 7.764 6.236 7.477 5.879 7.121C4.709 5.951 4.709 4.048 5.879 2.879C7.012 1.746 8.986 1.746 10.121 2.877C11.758 4.514 11.979 7.595 11.998 7.941C11.9991 7.9525 11.9966 7.96279 11.9941 7.97304C11.992 7.98151 11.99 7.98995 11.99 7.999H12.01C12.01 7.98986 12.0079 7.98134 12.0058 7.97287C12.0034 7.96282 12.0009 7.95286 12.002 7.942C12.022 7.596 12.242 4.515 13.879 2.878C15.014 1.745 16.986 1.746 18.121 2.877C19.29 4.049 19.29 5.952 18.121 7.121C17.764 7.477 17.337 7.764 16.886 7.999ZM7.293 5.707C6.903 5.316 6.903 4.682 7.293 4.292C7.481 4.103 7.732 4 8 4C8.268 4 8.519 4.103 8.707 4.292C9.297 4.882 9.641 5.94 9.825 6.822C8.945 6.639 7.879 6.293 7.293 5.707ZM14.174 6.824C14.359 5.941 14.702 4.883 15.293 4.293C15.481 4.103 15.732 4 16 4C16.268 4 16.519 4.103 16.706 4.291C17.096 4.682 17.097 5.316 16.707 5.707C16.116 6.298 15.057 6.642 14.174 6.824ZM3 13.999V19.999C3 21.102 3.897 21.999 5 21.999H11V13.999H3ZM13 13.999V21.999H19C20.104 21.999 21 21.102 21 19.999V13.999H13Z"></path>    
                </svg>
                <svg onClick={this.props.unfinished} className="" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#b9bbbe" d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM9.76445 11.448V15.48C8.90045 16.044 7.88045 16.356 6.74045 16.356C4.11245 16.356 2.66045 14.628 2.66045 12.072C2.66045 9.504 4.23245 7.764 6.78845 7.764C7.80845 7.764 8.66045 8.004 9.32045 8.376L9.04445 10.164C8.42045 9.768 7.68845 9.456 6.83645 9.456C5.40845 9.456 4.71245 10.512 4.71245 12.06C4.71245 13.62 5.43245 14.712 6.86045 14.712C7.31645 14.712 7.64045 14.616 7.97645 14.448V12.972H6.42845V11.448H9.76445ZM11.5481 7.92H13.6001V16.2H11.5481V7.92ZM20.4724 7.92V9.636H17.5564V11.328H19.8604V13.044H17.5564V16.2H15.5164V7.92H20.4724Z"></path>    
                </svg>
                <img onClick={this.props.unfinished} src={window.grayDatcordRobot} alt=""/>
            </div>
        )
    }
}
