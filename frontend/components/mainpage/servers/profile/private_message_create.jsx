import React, { Component } from 'react'

export default class PrivateMessageCreate extends Component {
    constructor(props) {
        super(props);

        this.updateFilter = this.updateFilter.bind(this)
        this.clickFriend = this.clickFriend.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            filter: "",
            selectedFriend: ""
        }
    }

    updateFilter(e) {
        e.preventDefault();
        this.setState({
            filter: e.currentTarget.value
        })
    }

    clickFriend(e) {
        e.preventDefault();
        if (this.state.selectedFriend == e.currentTarget.id) {
            this.setState({
                selectedFriend: ""
            })
        } else {
            this.setState({
                selectedFriend: e.currentTarget.id
            })
        }
        
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.selectedFriend != "") {
            this.props.addNewConversation(this.state.selectedFriend)
        }
        
    }
    
    render() {
        let pmClass = this.props.pmCreateActive? "pm-create-container active" : "pm-create-container";

        let friendList = this.props.currentUser.friends
        .filter( friend => {
            if (this.state.filter == "") {
                return true;
            } else {
                return friend.username.includes(this.state.filter)
            }
        }).map( friend => {
            let thisColor = this.props.colors[friend.id % this.props.colors.length];
            let liClass = this.state.selectedFriend == friend.id ? "selected" : ""
            let checkBox = this.state.selectedFriend == friend.id ? (
                <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4f545c" d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path>    
                </svg> 
            ) : ""
            return (
                <li className={liClass} id={friend.id} key={friend.id} onClick={this.clickFriend}>
                    <div className="user-list-pic" style={{backgroundColor: `${thisColor}`}}>
                        <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                    </div>
                    <div className="friend-info">
                        <h2>{friend.username}</h2>
                        <h4>{friend.username}#{friend.id}</h4>
                    </div>
                    <div className="checkbox">
                        {checkBox}
                    </div>
                </li>
            )
        });
        let buttonClass="";
        if (this.state.selectedFriend == "") {
            buttonClass="inactive";
        }

        return (
            <div id="modal" className={pmClass} onClick={this.props.togglePMCreateActive}>
                <div className="pm-create">
                    <h2>SELECT FRIEND</h2>
                    <h3>Select a friend to start a conversation</h3>
                    <input type="text" onChange={this.updateFilter} placeholder="Type the username of a friend"/>
                    <ul>
                        {friendList}
                    </ul>
                    <button className={buttonClass} onClick={this.handleSubmit}>Create Group DM</button>
                </div>
            </div>
        )
    }
}
