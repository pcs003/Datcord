import React from 'react'
import { Link } from 'react-router-dom'

export default class UserSettings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            emailRevealed: false
        }

        this.toggleRevealEmail = this.toggleRevealEmail.bind(this)
        this.censorEmail = this.censorEmail.bind(this)
    }

    toggleRevealEmail(e) {
        e.preventDefault();

        let current = this.state.emailRevealed;

        this.setState({
            emailRevealed: !current
        })
    }

    censorEmail(email) {
        let idx = email.indexOf("@");
        let stars = "*".repeat(idx);
        return stars + email.slice(idx)
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]

        let currentPicStyle = {
            backgroundColor: colors[this.props.currentUser.id % colors.length]
        }

        let toggleText = this.state.emailRevealed ? "Hide" : "Reveal"
        let emailText = this.state.emailRevealed ? this.props.currentUser.email : this.censorEmail(this.props.currentUser.email)
        return (
            <div id="user-settings-modal-wrapper" className="user-settings-modal-wrapper">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h3>USER SETTINGS</h3>
                        <h2>My Account</h2>
                        {/* <h2>Privacy & Safety</h2>
                        <h2>Authorized Apps</h2>
                        <h2>Connections</h2>
                        <div className="divider"></div>
                        <h3>BILLING SETTINGS</h3>
                        <h2 className="nitro">Discord Nitro</h2>
                        <h2>Server Boost</h2>
                        <h2>Gift Inventory</h2>
                        <h2>Billing</h2>
                        <div className="divider"></div>
                        <h3>APP SETTINGS</h3>
                        <h2>Voice & Video</h2>
                        <h2>Text & Images</h2>
                        <h2>Appearance</h2>
                        <h2>Notifications</h2>
                        <h2>Keybinds</h2>
                        <h2>Language</h2>
                        <h2>Windows Settings</h2>
                        <h2>Streamer Mode</h2>
                        <div className="divider"></div>
                        <h3>GAMING SETTINGS</h3>
                        <h2>Game Activity</h2>
                        <h2>Overlay</h2>
                        <div className="divider"></div>
                        <h2>Change Log</h2>
                        <h2>HypeSquad</h2> */}
                        <div className="divider"></div>
                        <h2 className="logout-button" onClick={this.props.logout}>Log Out</h2>
                        <div className="divider"></div>
                        <div className="personal-links">
                            <a href="https://github.com/pcs003" target="_blank" rel="noopener noreferrer"><img src={window.githubLogo} alt=""/></a>
                            <a href="https://www.linkedin.com/in/parth-shah-b6265763/"><img src={window.linkedInLogo} alt=""/></a>
                        </div>
                        <h5>Created by Parth Shah</h5>
                        <h5>Hosted on Heroku</h5>
                    </div>
                </div>
                <div className="content">
                    <div className="close-form-container" >
                        <div className="close-form" onClick={this.props.closeUserSettings} >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#dcddde" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>    
                            </svg> 
                        </div>
                        <div className="esc-text">ESC</div>
                    </div>
                    <h2>MY ACCOUNT</h2>
                    <div className="my-account-info">
                        <div className="top">
                            <div className="upload-image-icon"></div>
                            <input type="file" accept="image/jpg, image/png, image/jpeg" />
                            <div className="current-image" style={currentPicStyle}>
                                <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                                <span className="message">CHANGE AVATAR</span>
                            </div>
                            <div className="name-num">
                                <h2>{this.props.currentUser.username}<span>#{this.props.currentUser.id}</span></h2>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="username">
                                <h3>USERNAME</h3>
                                <h4>{this.props.currentUser.username}<span>#{this.props.currentUser.id}</span></h4>
                            </div>
                            <div className="email">
                                <h3>EMAIL</h3>
                                <h4>{emailText}<span className="toggle" onClick={this.toggleRevealEmail}>{toggleText}</span></h4>
                            </div>
                            <div className="phone-number">
                                <h3>PHONE NUMBER</h3>
                                <h4>You can't add phone numbers yet</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}