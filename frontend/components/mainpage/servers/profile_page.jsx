import React from 'react'
import Popup from 'react-popup'
import CurrentUserInfo from './current_user_info'

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.unfinished = this.unfinished.bind(this)
    }

    unfinished(e) {
        e.preventDefault();
        Popup.alert("Functionality not yet added")
    }

    render() {
        return (
            <div className="server-container">
                <div className="server-channel-nav">
                    <div className="server-name profile">
                        <span className="profile-find-conv">Find or start a conversation</span>
                    </div>
                    <div className="channel-nav profile">
                        <div className="friends-nitro-select">
                            <div className="option friends">
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
                                <svg width="15" height="15" viewBox="0 0 16 16">
                                    <polygon fill="#b9bbbe" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                                </svg> 
                            </h2>
                        </div>
                    </div>
                    <CurrentUserInfo openUserSettings={this.props.openUserSettings} muted={this.props.muted} deafened={this.props.deafened} currentUser={this.props.currentUser} toggleDeafen={this.props.toggleDeafen} toggleMute={this.props.toggleMute} />
                </div>
                <div className="right-div profile">
                    <div className="info-navbar">
                        <div className="info-items">
                            <div className="info-item-main">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <path fill="#72767d" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"></path>    
                                </svg> 
                                <span>Friends</span>
                            </div>
                            <div className="divider"></div>
                            <div className="info-item" onClick={this.unfinished}>
                                Online
                            </div>
                            <div className="info-item selected">
                                All
                            </div>
                            <div className="info-item" onClick={this.unfinished}>
                                Pending
                            </div>
                            <div className="info-item" onClick={this.unfinished}>
                                Blocked
                            </div>
                            <div className="info-item add-friend">
                                Add Friend
                            </div>

                        </div>
                        <div className="other-options">
                            <svg onClick={this.unfinished} width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z"></path>    
                            </svg> 
                            <div className="divider"></div>
                            <svg onClick={this.unfinished} width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"></path>    
                            </svg> 
                            <svg onClick={this.unfinished} width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#b9bbbe" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path>    
                            </svg> 
                        </div>
                    </div>            
                    <div className="messages-users-div">
                        <div className="messaging-div">
                            <h2>ALL FRIENDS &mdash;&mdash; </h2>
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
                </div>
                <Popup />
            </div>
        )
    }
}