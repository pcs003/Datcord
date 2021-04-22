import React, { Component } from 'react'
import Popup from 'react-popup'
import PrivateMessageForm from './private_message_form'
import * as Util from '../../../../util/general_util'
import ConfirmDeleteMessage from './confirm_delete_message'

export default class PrivateMessages extends Component {
    constructor(props) {
        super(props)

        this.unfinished = this.unfinished.bind(this)
        this.clickEdit = this.clickEdit.bind(this)
        this.clickDelete = this.clickDelete.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.editBody = this.editBody.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.enterKeyEdit = this.enterKeyEdit.bind(this)
        this.saveButton = this.saveButton.bind(this)
        this.cancelButton = this.cancelButton.bind(this)
        this.cancelChanges = this.cancelChanges.bind(this)
        
        this.state = {
            editMsgIdx: "",
            deleteMsgIdx: "",
            deleteModalActive:false,
            prevBody: "",
            editedBody: ""
        }

        this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        this.bottom = React.createRef();

    }

    componentDidUpdate() {
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView(false);
        }
        
    }

    unfinished(e) {
        e.preventDefault();
        Popup.alert("Functionality not yet added")
    }

    clickEdit(e) {
        e.preventDefault();
        let body = this.props.privateMessages.find(pm => {
            return pm.id == e.currentTarget.id
        }).body
        this.setState({
            editMsgIdx: e.currentTarget.id,
            editedBody: body,
            prevBody: body
        })
    }

    editBody(e) {
        e.preventDefault();
        this.setState({
            editedBody: e.currentTarget.value
        })
    }

    clickDelete(e) {
        e.preventDefault();
        this.setState({
            deleteMsgIdx: e.currentTarget.id,
            deleteModalActive: true
        })
        console.log(e.currentTarget.id)
    }

    confirmDelete(id) {
        this.setState({
            deleteModalActive: false
        })
        this.props.deletePrivateMessage(id).then(() => {
            this.props.fetchPrivateMessages(this.props.match.params.channel_id)
        })
    }

    handleClick(e) {
        e.preventDefault();
        console.log(e.currentTarget.id)
        if (e.target.id == "modal-wrapper") {
            this.setState({
                deleteModalActive: false
            })
        }
    }

    enterKeyEdit(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            this.saveChanges();
        } else if (e.keyCode == 27) {
            e.preventDefault();
            this.cancelChanges()
        }
    }

    saveButton(e) {
        e.preventDefault();
        this.saveChanges();
    }

    saveChanges() {
        this.props.updatePrivateMessage({
            id: this.state.editMsgIdx,
            body: this.state.editedBody,
            sender_id: this.props.currentUser.id,
            recipient_id: this.props.match.params.channel_id
        }).then( () => {
            this.props.fetchPrivateMessages(this.props.match.params.channel_id).then(() =>{
                this.setState({
                    editMsgIdx: ""
                })
            })
        })
    }

    cancelButton(e) {
        e.preventDefault();
        this.cancelChanges()
    }

    cancelChanges() {
        // let prev = this.state.prevBody;
        this.setState({
            editMsgIdx: ""
        })
    }

    render() {
        let otherUser = this.props.currentUser.friends.find(friend => {
            return friend.id == this.props.page
        })
        let otherColor = this.props.colors[otherUser.id % this.props.colors.length];
        let beginning = (
            <div className="beginning-wrapper">
                <div className="current-user-pic" style={{backgroundColor: `${otherColor}`}}>
                    <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                </div>
                <h2>{otherUser.username}</h2>
                <h3>This is the beginning of your direct message history with <span>@{otherUser.username}</span></h3>
                <div className="date-divider">
                    <div className="line"></div>
                </div>
            </div>
        )
        
        let messageListItems = [];
        this.props.privateMessages.forEach((msg, i) => {
            if (msg.message) {
                return;
            };

            let thisColor = this.props.colors[msg.sender_id % this.props.colors.length];

            // determines if date divider is necessary and adds if it is
            if (i >= 1) {
                let prevDay = new Date().getDate('en-US', { timeZone: 'America/New_York' })
                if (this.props.privateMessages[i - 1].created_at) {
                    prevDay = new Date(this.props.privateMessages[i - 1].created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                var msgD = new Date().getDate('en-US', { timeZone: 'America/New_York' });
                if (msg.created_at) {
                    msgD = new Date(msg.created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                if (msgD != prevDay) {

                    let date = new Date()
                    if (msg.created_at) {
                        date = new Date(msg.created_at)
                    }

                    
                    messageListItems.push(
                        <div className="date-divider" key={i}>
                            <div className="line"></div>
                            <h2>{this.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}</h2>
                        </div>
                    )
                }
            }

            // creates edit and delete options when hovering over message
            let msgOptions=""
            if (msg.sender_id == parseInt(this.props.currentUser.id)) {
                msgOptions = (
                    <div className="message-options">
                        <div className="option edit" id={msg.id} onClick={this.clickEdit}>
                            <svg className="" width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"></path>    
                            </svg>
                            <span>Edit</span>
                        </div>
                        <div className="option delete" id={msg.id} onClick={this.clickDelete}>
                            <svg className="" width="16" height="16" viewBox="0 0 20 24">
                                <path fill="#f04747" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
                                <path fill="#f04747" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>    
                            </svg>
                            <span>Delete</span>
                        </div>
                    </div>
                )
            }
            
            // handles edit form
            let msgBody = "";
            if (this.state.editMsgIdx == msg.id) {
                msgBody = (
                    <div className="edit-message-container" onKeyDown={this.enterKeyEdit}>
                        <input type="text" onChange={this.editBody} value={this.state.editedBody} />
                        <h4>escape to <span onClick={this.cancelButton}>cancel</span> • enter to <span onClick={this.saveButton}>save</span></h4>
                    </div>
                )
            } else {
                if (msg.edited) {
                    msgBody=(
                        <h3>{msg.body} <span>(edited)</span></h3>
                    )
                } else {
                    msgBody=(
                        <h3>{msg.body}</h3>
                    )
                }
                
            }

            // handles if same user sent two in a row
            if (i >= 1 && this.props.privateMessages[i-1].sender_id == msg.sender_id) {
                
                
                let prevDay = new Date().getDate()
                if (this.props.privateMessages[i - 1].created_at) {
                    prevDay = new Date(this.props.privateMessages[i - 1].created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                var msgD = new Date().getDate();
                if (msg.created_at) {
                    msgD = new Date(msg.created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }

                // handles multiple messages sent by same user
                if (msgD == prevDay) {
                    messageListItems.push(
                        <li className="repeat" key={msg.id} >
                            <div className="message-info">
                                <span className="timestamp">{Util.generateTimeStampRepeat(msg.created_at)}</span>
                                {msgBody}
                            </div>
                            {msgOptions}
                        </li>
                    )
                } else { // if same user sent message on separate days it is not repeat  
                    let uName = this.props.currentUser.friends.concat(this.props.currentUser).find(friend => {
                        return friend.id == msg.sender_id
                    }).username
                    messageListItems.push(
                        <li key={msg.id} >
                            <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                                <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                            </div>
                            <div className="message-info">
                                <h2>{uName} <span className="timestamp">{Util.generateTimeStamp(msg.created_at)}</span></h2>
                                {msgBody}
                            </div>
                            {msgOptions}
                        </li>
                    )
                }
                
            } else { // handles different user message
                let uName = this.props.currentUser.friends.concat(this.props.currentUser).find(friend => {
                    return friend.id == msg.sender_id
                }).username
                messageListItems.push(
                    <li key={msg.id} >
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{uName} <span className="timestamp">{Util.generateTimeStamp(msg.created_at)}</span></h2>
                            {msgBody}
                        </div>
                        {msgOptions}
                    </li>
                )
            }
            
            
        })
        let deleteModal = ""
        if (this.state.deleteModalActive) {
            deleteModal = (
                <ConfirmDeleteMessage 
                    privateMessages={this.props.privateMessages}
                    confirmDelete={this.confirmDelete}
                    messageId={this.state.deleteMsgIdx}
                    colors={this.props.colors}
                    handleClick={this.handleClick}
                />
            )
        }
        return (
            <div className="pms-container">
                <div className="all-messages-wrapper">
                    <ul>
                        {beginning}
                        {messageListItems}
                        <div ref={this.bottom} />
                    </ul>
                </div>
                <PrivateMessageForm 
                    unfinished={this.unfinished}
                    page={this.props.page}
                    currentUser={this.props.currentUser}
                    createPrivateMessage={this.props.createPrivateMessage}
                    fetchPrivateMessages={this.props.fetchPrivateMessages}
                    match={this.props.match}
                />
                {deleteModal}
                <Popup />
            </div>
        )
    }
}
