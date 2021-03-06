import React, { Component } from 'react'
import * as Util from '../../../../util/general_util'

export default class ConfirmDeleteMessage extends Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e) {
        e.preventDefault();
        this.props.confirmDelete(e.currentTarget.id)
    }

    render() {

        let thisMessage = this.props.privateMessages.find( pm => {
            return pm.id == this.props.messageId
        })
        let thisColor = this.props.colors[thisMessage.sender_id % this.props.colors.length]
        if (thisMessage.author_id) {
            thisColor = this.props.colors[thisMessage.author_id % this.props.colors.length]
        }

        let name = "";
        if (thisMessage.author) {
            name = thisMessage.author.username
        } else {
            name = thisMessage.sender.username
        }
        return (
            <div className="delete-message-modal-wrapper" id="modal-wrapper" onClick={this.props.handleClick}>
                <div className="modal">
                    <h2>DELETE MESSAGE</h2>
                    <h3>Are you sure you want to delete this message?</h3>
                    <div className="message">
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{name} <span className="timestamp">{Util.generateTimeStamp(thisMessage.created_at)}</span></h2>
                            <h3>{thisMessage.body}</h3>
                        </div>
                    </div>
                    <div className="options">
                        <h2 id="close-delete-modal">Cancel</h2>
                        <button onClick={this.handleDelete} id={thisMessage.id}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}
