import React from 'react'

export default class ServerSettings extends React.Component {
    constructor(props) {
        super(props)

        this.handleDeleteServer = this.handleDeleteServer.bind(this)
        this.updateName = this.updateName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        let original = this.props.clickedServerName;
        this.state = {
            name: original,
            originalName: original,
            justloaded: true
        }
    }

    handleDeleteServer(e){
        e.preventDefault();
        this.props.deleteServer(this.props.clickedServerId).then(()=> {
            this.props.closeServerSettings();
            this.props.getServers();
            this.props.history.push(`/channels/@me`)
        })
    }

    updateName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
            justLoaded: false
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let thisServer = this.props.servers.find(server => server.id == this.props.clickedServerId );
        let updated = Object.assign({}, thisServer);
        updated.name = this.state.name;
        this.props.updateServer(updated).then(() => {
            this.props.getServers();
        });
        
        this.setState({
            originalName: updated.name
        })
    }

    render() {

        let saveClass = "save-changes-container"
        if (this.state.justLoaded === false) {
            if (this.state.name === this.state.originalName ) {
                saveClass = "save-changes-container inactive"
            } else {
                saveClass = "save-changes-container active"
            }
        }
        
        return (
            <div id="server-settings-modal-wrapper" className="server-settings-modal-wrapper">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h3>TEST</h3>
                        <h2>Overview</h2>
                        <h2>Roles</h2>
                        <h2>Emoji</h2>
                        <h2>Moderation</h2>
                        <h2>Audit Log</h2>
                        <h2>Integrations</h2>
                        <h2>Widget</h2>
                        <h2>Server Template</h2>
                        <div className="divider"></div>
                        <h3>COMMUNITY</h3>
                        <h2>Enable Community</h2>
                        <div className="divider"></div>
                        <h2 className="server-boost">Server Boost Status</h2>
                        <div className="divider"></div>
                        <h3>USER MANAGEMENT</h3>
                        <h2>Members</h2>
                        <h2>Invites</h2>
                        <h2>Bans</h2>
                        <div className="divider"></div>
                        <h2 className="delete-button" onClick={this.handleDeleteServer}>Delete Server</h2>
                    </div>
                </div>
                <div className="content">
                    <div className="close-form-container" >
                        <div className="close-form" onClick={this.props.closeServerSettings} >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#dcddde" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>    
                            </svg> 
                        </div>
                        <div className="esc-text">ESC</div>
                    </div>
                    <div className="overview">
                        <h1>SERVER OVERVIEW</h1>
                        <div className="update-server-wrapper">
                            <div className="image-update-wrapper">
                                <div className="left-side">
                                    <div className="upload-image-icon"></div>
                                    <input type="file" accept="image/jpg, image/png, image/jpeg" />
                                    <div className="current-image">
                                        <span className="initial">{this.props.clickedServerName[0]}</span>
                                        <span className="message">CHANGE ICON</span>
                                    </div>
                                    <h3>Minimum Size: <span>128x128</span></h3>
                                </div>
                                <div className="right-side">
                                    <div className="recommended">
                                        We recommend an image of at least 512x512 for the server
                                    </div>
                                    <div className="upload-button">
                                        Upload Image
                                        <input type="file" accept="image/jpg, image/png, image/jpeg" />
                                    </div>
                                </div>
                            </div>
                            <div className="name-update-wrapper">
                                <label htmlFor="name">SERVER NAME</label>
                                <input name="name" type="text" defaultValue={this.props.clickedServerName} onChange={this.updateName}/>
                                <label>SERVER REGION</label>
                                <div className="server-div">
                                    <div className="current-server">
                                        Heroku
                                    </div>
                                    <div className="change-server-button">
                                        Change
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={saveClass}>
                        <div className="warning">
                            Careful &mdash; you have unsaved changes!
                        </div>
                        <div className="options">
                            <div className="reset">
                                Reset
                            </div>
                            <div className="save" onClick={this.handleSubmit}>
                                Save Changes
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}