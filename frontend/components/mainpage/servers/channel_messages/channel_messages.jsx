import React from 'react'
import ChannelMessageForm from './channel_message_form'
import ConfirmDeleteMessage from '../profile/confirm_delete_message'
import * as Util from '../../../../util/general_util'

export default class ChannelMessages extends React.Component {
    constructor(props) {
        super(props)

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
            messages: [],
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

    clickEdit(e) {
        e.preventDefault();
        let body = this.props.channelMessages.find(msg => {
            return msg.id == e.currentTarget.id
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
    }

    confirmDelete(id) {
        this.setState({
            deleteModalActive: false
        })
        this.props.deleteChannelMessage(id).then(() => {
            this.props.getChannelMessages(this.props.match.params.channel_id)
        })
    }

    handleClick(e) {
        e.preventDefault();
        if (e.target.id == "modal-wrapper" || e.target.id == "close-delete-modal") {
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
        this.props.updateChannelMessage({
            id: this.state.editMsgIdx,
            body: this.state.editedBody
        }).then( () => {
            this.props.getChannelMessages(this.props.match.params.channel_id).then(() =>{
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
        this.setState({
            editMsgIdx: ""
        })
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
            } else if (a.created_at < b.created_at){
                return -1
            } else {
                return 0;
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
                    prevDay = new Date(this.props.channelMessages[i - 1].created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                var msgD = new Date().getDate();
                if (message.created_at) {
                    msgD = new Date(message.created_at).getDate('en-US', { timeZone: 'America/New_York' })
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

            // creates edit and delete options when hovering over message
            let msgOptions=""
            if (message.author_id == parseInt(this.props.currentUser.id)) {
                msgOptions = (
                    <div className="message-options">
                        <div className="option edit" id={message.id} onClick={this.clickEdit}>
                            <svg className="" width="16" height="16" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"></path>    
                            </svg>
                            <span>Edit</span>
                        </div>
                        <div className="option delete" id={message.id} onClick={this.clickDelete}>
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
            if (this.state.editMsgIdx == message.id) {
                msgBody = (
                    <div className="edit-message-container" onKeyDown={this.enterKeyEdit}>
                        <input type="text" onChange={this.editBody} value={this.state.editedBody} />
                        <h4>escape to <span onClick={this.cancelButton}>cancel</span> • enter to <span onClick={this.saveButton}>save</span></h4>
                    </div>
                )
            } else {
                if (message.edited) {
                    msgBody=(
                        <h3>{message.body} <span>(edited)</span></h3>
                    )
                } else {
                    msgBody=(
                        <h3>{message.body}</h3>
                    )
                }
                
            }

            if (i >= 1 && this.props.channelMessages[i - 1].author_id === message.author_id) {
                let prevDay = new Date().getDate()
                if (this.props.channelMessages[i - 1].created_at) {
                    prevDay = new Date(this.props.channelMessages[i - 1].created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                var msgD = new Date().getDate();
                if (message.created_at) {
                    msgD = new Date(message.created_at).getDate('en-US', { timeZone: 'America/New_York' })
                }
                
                if (msgD == prevDay) {
                    messageListItems.push(
                        <li className="repeat" key={message.id} >
                            <div className="message-info">
                                <span className="timestamp">{Util.generateTimeStampRepeat(message.created_at)}</span>
                                {msgBody}
                            </div>
                            {msgOptions}
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
                                {msgBody}
                            </div>
                            {msgOptions}
                        </li>
                    )
                }
                
                
            } else {
                messageListItems.push(
                    <li key={message.id} >
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{authorName} <span className="timestamp">{Util.generateTimeStamp(message.created_at)}</span></h2>
                            {msgBody}
                        </div>
                        {msgOptions}
                    </li>
                )
            }
            
        })

        let thisChannel = this.props.currentChannel || {name:""}

        let deleteModal = ""
        if (this.state.deleteModalActive) {
            deleteModal = (
                <ConfirmDeleteMessage 
                    privateMessages={this.props.channelMessages}
                    confirmDelete={this.confirmDelete}
                    messageId={this.state.deleteMsgIdx}
                    colors={colors}
                    handleClick={this.handleClick}
                />
            )
        }

        return (
            <div className="messaging-div">
                <div className="all-messages-wrapper">
                    <ul>
                        {messageListItems}
                        <div ref={this.bottom} />
                    </ul>
                    
                </div>
                <ChannelMessageForm createChannelMessage={this.props.createChannelMessage} currentChannel={thisChannel} getChannelMessages={this.props.getChannelMessages} currentUser={this.props.currentUser} match={this.props.match}/>
                {deleteModal}
            </div>
            
        )
    }
}