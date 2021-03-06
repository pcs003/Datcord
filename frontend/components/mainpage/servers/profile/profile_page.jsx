import React from 'react'
import Popup from 'react-popup'
import { Link } from 'react-router-dom'
import { RECEIVE_CURRENT_USER } from '../../../../actions/session_actions';
import CurrentUserInfo from '../current_user_info'
import FriendsInfoNavbar from './friends_info_navbar';
import PMsInfoNavbar from './pms_info_navbar';
import PrivateMessages from './private_messages';
import PrivateMessageCreate from './private_message_create';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.unfinished = this.unfinished.bind(this)
        this.clickTab = this.clickTab.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onAddFriendSubmit = this.onAddFriendSubmit.bind(this)
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this)
        this.removeFriend = this.removeFriend.bind(this)
        this.removeFriendCM = this.removeFriendCM.bind(this)
        this.togglePMCreateActive = this.togglePMCreateActive.bind(this)
        this.conversations = this.conversations.bind(this)
        this.clickPage = this.clickPage.bind(this)
        this.getResponsePrivateMessage = this.getResponsePrivateMessage.bind(this)
        this.friendContextMenu = this.friendContextMenu.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.addNewConversation = this.addNewConversation.bind(this)
        this.messageFriendCM = this.messageFriendCM.bind(this)

        let currentPage = "friends"
        if (parseInt(this.props.match.params.channel_id) != this.props.currentUser.id) {
            currentPage = parseInt(this.props.match.params.channel_id)
            this.props.fetchPrivateMessages(this.props.match.params.channel_id)
        }
        this.state = {
            selectedTab: 1,
            addFriendName: "",
            errored: true,
            headerText: "You can add a friend with their discord tag. It's cAsE sEnSitIvE!",
            page: currentPage,
            pmCreateActive: false,
            contextMenuVisible: false,
            cmX: "100px",
            cmY: "100px",
            clickedFriend: 0,
            newConversations: [],
            uniqUsers: {}
        }

        
    }

    componentDidMount() {
        this.conversations();

        let recipientId = this.props.match.params.channel_id;
        if (parseInt(recipientId) != this.props.currentUser.id) {
            this.props.fetchPrivateMessages(recipientId)
        }
        
        
        App.cable.subscriptions.create(
            { channel: "PrivateMessagesChannel", recipientId: recipientId},
            {
                received: data => {
                    
                },
                speak: function(data) {
                    return this.perform("speak", data)
                }
            }
        )

        App.cable.subscriptions.create(
            { channel: "PrivateMessagesChannel", recipientId: this.props.currentUser.id},
            {
                received: data => {
                    this.getResponsePrivateMessage(data)
                },
                speak: function(data) {
                }
            }
        )

        document.addEventListener("click", this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick)
    }

    getResponsePrivateMessage(data) {
        if (this.props.currentUser.id == data.message.recipient_id) {
            this.props.receivePrivateMessage({message: data})
        }
        this.props.fetchPrivateMessages(data.message.sender_id)
        
    }

    unfinished(e) {
        e.preventDefault();
        Popup.alert("Functionality not yet added")
    }

    conversations() {
        let current = this.state.uniqUsers;
        this.props.currentUser.friends.forEach(friend => {
            this.props.fetchPrivateMessages(friend.id).then(action => {
                if (current[friend.id] == undefined && Object.values(action.privateMessages).length > 0) {
                    current[friend.id] = friend
                    this.setState({
                        uniqUsers: current
                    })
                }
                this.props.fetchPrivateMessages(this.props.match.params.channel_id)
            })
        })
        
        
    }

    clickTab(num) {
        return e => {
            e.preventDefault();
            this.setState({
                selectedTab: num
            })
        }
    }

    clickPage(e) {
        e.preventDefault();
        if (e.currentTarget.id == 0) {
            this.setState({
                page: "friends"
            })
            this.props.history.push(`/channels/@me/${this.props.currentUser.id}`)
        } else {
            this.setState({
                page: e.currentTarget.id
            })
            this.props.fetchPrivateMessages(e.currentTarget.id)
            this.props.history.push(`/channels/@me/${e.currentTarget.id}`)
        }

    }

    onChangeName(e) {
        e.preventDefault();
        this.setState({
            addFriendName: e.currentTarget.value
        })
    }

    onAddFriendSubmit(e) {
        e.preventDefault();

        if (this.state.addFriendName == "") {
            return;
        }
        let hashIdx = this.state.addFriendName.indexOf('#')
        if (hashIdx == -1) {
            this.setState({
                headerText: `We need ${this.state.addFriendName}'s id after the # so we know which one they are`
            })
            return;
        }
        
        let id = parseInt(this.state.addFriendName.slice(hashIdx + 1))

        this.props.addFriend(this.state.addFriendName).then(()=>{
            this.setState({
                addFriendName: ""
            })
        }, () => {
            let current = this.state.addFriendName
            this.setState({
                headerText: "Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.",
            })
        })

        
    }

    acceptFriendRequest(e) {
        e.preventDefault();
        this.props.acceptFriend(e.currentTarget.id)
    }

    removeFriend(e) {
        e.preventDefault();
        this.props.removeFriend(e.currentTarget.id)
    }

    togglePMCreateActive(e) {
        e.preventDefault();
        let current = this.state.pmCreateActive;

        if (current) {
            if (e.target.id == "modal") {
                this.setState({
                    pmCreateActive: !current
                })
            }
        } else {
            this.setState({
                pmCreateActive: !current
            })
        }
    }

    friendContextMenu(e) {
        e.preventDefault();
        this.setState({
            contextMenuVisible: true,
            cmX: e.pageX + "px",
            cmY: e.pageY + "px",
            clickedFriend: e.currentTarget.id

        })
    }

    removeFriendCM(e) {
        e.preventDefault();
        this.props.removeFriend(this.state.clickedFriend)
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            contextMenuVisible: false,
        })
    }

    addNewConversation(id) {
        let friendName = this.props.currentUser.friends.find(friend => {
            return friend.id == id
        }).username
        let convObj = {id: id, username: friendName}
        let current = this.state.newConversations;
        current.push(convObj);
        this.setState({
            newConversations: current,
            pmCreateActive: false,
        })
        this.props.history.push(`/channels/@me/${id}`)
    }

    messageFriendCM(e) {
        e.preventDefault()
        this.addNewConversation(this.state.clickedFriend)
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]

        let friendItems = []
        let pendingFriends = [];
        let option = ""
        this.props.currentUser.friends
        .sort( (f1, f2) => {
            if (f1.username < f2.username) {
                return -1
            } else {
                return 1
            }
        }).forEach((friend, i) => {
            let thisColor = colors[friend.id % colors.length];

            let pendingAdded = this.props.currentUser.friendships_added.filter(friendship => {
                return friendship.accepted == false
            }).map(friendship => friendship.friendee_id);
            let pendingAccepted = this.props.currentUser.friendships_accepted.filter(friendship => {
                return friendship.accepted == false
            }).map(friendship => friendship.friender_id);

            
            if (pendingAdded.concat(pendingAccepted).includes(friend.id)) {
                
                if (pendingAdded.includes(friend.id)) {
                    let fsId = this.props.currentUser.friendships_added.find(fs => {
                        return fs.friendee_id == friend.id
                    }).id
                    option = (
                        <div className="options">
                            <div className="x" id={fsId} onClick={this.removeFriend}>&#x2715;<span>Cancel</span></div>
                        </div>
                    )
                } else {
                    let fsId = this.props.currentUser.friendships_accepted.find(fs => {
                        return fs.friender_id == friend.id
                    }).id
                    
                    option = (
                        <div className="options">
                            <div className="check" id={fsId} onClick={this.acceptFriendRequest}>&#x2713;<span>Accept</span></div>
                            <div className="x" id={fsId} onClick={this.removeFriend}>&#x2715;<span>Reject</span></div>
                        </div>
                    )
                }
                pendingFriends.push(
                    <li key={friend.id} className="pending">
                        <div className="user-list-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="friend-info">
                            <h2>{friend.username}</h2>
                            <h3>Online/Offline</h3>
                        </div>
                        {option}
                    </li>
                )
            } else {
                let fsId = this.props.currentUser.friendships_accepted.concat(this.props.currentUser.friendships_added).find(fs => {
                    return fs.friender_id == friend.id || fs.friendee_id == friend.id
                }).id
                friendItems.push(
                    <li key={friend.id} id={fsId} onContextMenu={this.friendContextMenu}>
                        <div className="user-list-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="friend-info">
                            <h2>{friend.username}</h2>
                            <h3>Online/Offline</h3>
                        </div>
                        
                    </li>
                )
            }
            
        })
        let currentItems = "";
        let friendListHeader = ""
        let buttonClass = this.state.addFriendName == "" ? "disabled" : "";
        let h3Class = this.state.headerText == "You can add a friend with their discord tag. It's cAsE sEnSitIvE!" ? "" : "errored"
        if (this.state.selectedTab == 1) {
            currentItems = friendItems;
            friendListHeader = <h2>ALL FRIENDS &mdash;&mdash; {friendItems.length}</h2>;
        } else if (this.state.selectedTab == 2) {
            currentItems = pendingFriends;
            friendListHeader = <h2>PENDING &mdash;&mdash; {pendingFriends.length}</h2>
        } else if (this.state.selectedTab == 4) {
            currentItems = (
                <div className="add-friend-container">
                    <h2 className="add-header">ADD FRIEND</h2>
                    <h3 className={h3Class}>{this.state.headerText}</h3>
                    <div className="input-container">
                        <input type="text" placeholder="Enter a Username#0000"onChange={this.onChangeName} value={this.state.addFriendName}/>
                        <button className={buttonClass} onClick={this.onAddFriendSubmit}>Send Friend Request</button>
                    </div>
                    <div className="wumpus-container">
                        <img src={window.wumpus} alt=""/>
                        <h3>Wumpus is waiting on friends. You don't have to though!</h3>
                    </div>
                </div>
            )
        }

        let rightContent=""
        if (this.state.page === "friends") {
            rightContent = (
                <div className="messages-users-div profile">
                    <div className="messaging-div profile">
                        {friendListHeader}
                        <ul className="friends-list">
                            {currentItems}
                            
                        </ul>
                    </div>
                    <div className="server-members-nav">
                        <h2 className="members-header"></h2>
                        
                        <div className="user-list-item invis">
                            <div className="user-list-pic" >
                            </div>
                            <h2></h2>
                        </div>
                    </div>
                </div>
            )
        } else {
            rightContent = (
                <PrivateMessages
                    match={this.props.match}
                    currentUser={this.props.currentUser}
                    fetchPrivateMessages={this.props.fetchPrivateMessages}
                    page={this.state.page}
                    privateMessages={this.props.privateMessages}
                    colors={colors}
                    createPrivateMessage={this.props.createPrivateMessage}
                    recievePrivateMessage={this.props.recievePrivateMessage}
                    updatePrivateMessage={this.props.updatePrivateMessage}
                    deletePrivateMessage={this.props.deletePrivateMessage}
                />
            )
        }
        let temp = [];
        if (this.state.page != "friends") {
            if (this.state.newConversations.length === 0 && !Object.values(this.state.uniqUsers).map(u => u.id).includes(parseInt(this.props.match.params.channel_id))) {
                let friend = this.props.currentUser.friends.find(friend => {
                    return friend.id == this.props.match.params.channel_id
                })
                temp.push(friend)
            }
        }
        
        let conversations = Object.values(this.state.uniqUsers).concat(this.state.newConversations).concat(temp).map(user => {
            let thisColor = colors[user.id % colors.length];
            let thisClass = parseInt(this.state.page) == user.id ? "conversations selected" : "conversations"
            return (
                <div id={user.id} className={thisClass} onClick={this.clickPage}>
                    <div className="user-list-pic" style={{backgroundColor: `${thisColor}`}}>
                        <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                    </div>
                    <h2>{user.username}</h2>
                </div>
            )
        })

        let friendsClass = this.state.page == "friends" ? "option friends selected" : "option friends"

        let infoNavbar = this.state.page == "friends" ? (
            <FriendsInfoNavbar 
                selectedTab={this.state.selectedTab}
                clickTab={this.clickTab}
                unfinished={this.unfinished}
            />            
        ) : (
            <PMsInfoNavbar
                selectedTab={this.state.selectedTab}
                clickTab={this.clickTab}
                unfinished={this.unfinished}
                currentUser={this.props.currentUser}
                match={this.props.match}
            />            
        )

        let contextMenuClass = this.state.contextMenuVisible ? "friends-context-menu active" : "friends-context-menu"
        let contextMenuStyle = {
            position: "absolute", 
            top: this.state.cmY, 
            left: this.state.cmX, 
            
        }

        let friendContextMenu = this.state.contextMenuVisible ? (
            <div className={contextMenuClass} style={contextMenuStyle}>
                <div className="option" onClick={this.messageFriendCM}>
                    <span>Message</span>
                </div>
                <div className="divider"></div>
                <div className="option" onClick={this.removeFriendCM}>
                    <span>Remove Friend</span>
                </div>
            </div>
        ) : "";

        return (
            <div className="server-container">
                {friendContextMenu}
                <div className="server-channel-nav">
                    <div className="server-name profile">
                        <span className="profile-find-conv" onClick={this.unfinished}>Find or start a conversation</span>
                    </div>
                    <div className="channel-nav profile">
                        <div className="friends-nitro-select">
                            <div className={friendsClass} id="0" onClick={this.clickPage}>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"></path>    
                                </svg> 
                                <span>Friends</span>
                            </div>
                            <div className="option nitro" onClick={this.unfinished}>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"></path>    
                                </svg> 
                                <span>Nitro</span>
                            </div>
                        </div>
                        <div className="direct-messages-wrapper">
                            <h2>
                                DIRECT MESSAGES
                                <div className="svg-container" onClick={this.togglePMCreateActive}>
                                    <svg width="15" height="15" viewBox="0 0 16 16">
                                        <polygon fill="#b9bbbe" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                                    </svg> 
                                    <span>Create DM</span>
                                    
                                </div>
                            </h2>
                            {conversations}
                        </div>
                    </div>
                    <CurrentUserInfo openUserSettings={this.props.openUserSettings} muted={this.props.muted} deafened={this.props.deafened} currentUser={this.props.currentUser} toggleDeafen={this.props.toggleDeafen} toggleMute={this.props.toggleMute} />
                </div>
                <div className="right-div profile">
                    {infoNavbar}
                    {rightContent}
                </div>
                <PrivateMessageCreate 
                    currentUser={this.props.currentUser}
                    colors={colors}
                    pmCreateActive={this.state.pmCreateActive}
                    togglePMCreateActive={this.togglePMCreateActive}
                    addNewConversation={this.addNewConversation}
                />
                <Popup />
            </div>
        )
    }
}