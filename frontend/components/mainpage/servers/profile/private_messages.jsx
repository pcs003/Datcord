import React, { Component } from 'react'
import Popup from 'react-popup'
import PrivateMessageForm from './private_message_form'
import * as Util from '../../../../util/general_util'

export default class PrivateMessages extends Component {
    constructor(props) {
        super(props)

        this.unfinished = this.unfinished.bind(this)
        

        this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        this.bottom = React.createRef();

    }

    componentDidMount() {
        
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


    render() {
        
        
        let messageListItems = [];
        this.props.privateMessages.forEach((msg, i) => {
            
            let thisColor = this.props.colors[msg.sender_id % this.props.colors.length];

            if (i == 0) {
                let date = new Date()
                if (msg.created_at) {
                    date = new Date(msg.created_at)
                }
                messageListItems.push(
                    <div className="date-divider">
                        <div className="line"></div>
                        <h2>{this.monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}</h2>
                    </div>
                )
            } else if (i >= 1) {
                let prevDay = new Date().getDay()
                if (this.props.privateMessages[i - 1].created_at) {
                    prevDay = this.props.privateMessages[i - 1].created_at.slice(8,10)
                }
                
                var msgD = new Date().getDate();
                if (msg.created_at) {
                    msgD = parseInt(msg.created_at.slice(8,10))
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

            

            if (i >= 1 && this.props.privateMessages[i-1].sender_id == msg.sender_id) {
                let prevDay = new Date().getDay()
                if (this.props.privateMessages[i - 1].created_at) {
                    prevDay = this.props.privateMessages[i - 1].created_at.slice(8,10)
                }
                
                var msgD = new Date().getDate();
                if (msg.created_at) {
                    msgD = parseInt(msg.created_at.slice(8,10))
                }

                if (msgD == prevDay) {
                    messageListItems.push(
                        <li className="repeat" key={msg.id} >
                            <div className="message-info">
                                <span className="timestamp">{Util.generateTimeStampRepeat(msg.created_at)}</span>
                                <h3>{msg.body}</h3>
                            </div>
                        </li>
                    )
                } else {
                    messageListItems.push(
                        <li key={msg.id} >
                            <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                                <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                            </div>
                            <div className="message-info">
                                <h2>{msg.sender.username} <span className="timestamp">{Util.generateTimeStamp(msg.created_at)}</span></h2>
                                <h3>{msg.body}</h3>
                            </div>
                            
                        </li>
                    )
                }
                
            } else {
                let uname = this.props.currentUser.username
                if (msg.sender) {
                    uname = msg.sender.username
                }
                messageListItems.push(
                    <li key={msg.id} >
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{uname} <span className="timestamp">{Util.generateTimeStamp(msg.created_at)}</span></h2>
                            <h3>{msg.body}</h3>
                        </div>
                        
                    </li>
                )
            }
            
            
        })
        return (
            <div className="pms-container">
                <div className="all-messages-wrapper">
                    <ul>
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
                <Popup />
            </div>
        )
    }
}
