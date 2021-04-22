import React from 'react'

export default class ServerSettings extends React.Component {
    constructor(props) {
        super(props)

        this.handleDeleteServer = this.handleDeleteServer.bind(this)
        this.updateName = this.updateName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.openDeletePopup = this.openDeletePopup.bind(this)
        this.closeDeletePopup = this.closeDeletePopup.bind(this)
        this.updateDeletePopupText = this.updateDeletePopupText.bind(this)
        this.resetName = this.resetName.bind(this)

        let original = this.props.clickedServerName;
        this.state = {
            name: original,
            originalName: original,
            justloaded: true,
            deletePopupActive: false,
            deletePopupText: "",
            deleteFailed: false
        }
    }

    handleDeleteServer(e){
        e.preventDefault();
        if (this.state.deletePopupText === this.state.originalName) {
            this.setState({
                deleteFailed: false
            })
            this.props.deleteServer(this.props.clickedServerId).then(()=> {
                this.props.closeServerSettings();
                this.props.getServers();
                this.props.history.push(`/channels/@me/${this.props.currentUser.id}`)
            })
        } else {
            this.setState({
                deleteFailed: true
            })
        }
        
    }

    updateName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
            justLoaded: false
        })
    }

    resetName(e) {
        e.preventDefault();
        this.setState({
            name: this.state.originalName,
        })
        document.getElementById("update-server-name-input").value = this.state.originalName;
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

    openDeletePopup(e) {
        e.preventDefault();
        this.setState({
            deletePopupActive: true
        })
    }

    closeDeletePopup(e) {
        e.preventDefault();

        let wrapper = document.getElementById("delete-server-popup-wrapper");

        wrapper.classList.add("inactive");

        setTimeout(() => {
            this.setState({
                deletePopupActive: false
            })
        }, 100);
    }

    updateDeletePopupText(e) {
        e.preventDefault;
        this.setState({
            deletePopupText: e.target.value
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

        let errorText = this.state.deleteFailed ? <h5 className="error">You didn't enter the server name correctly</h5> : ""

        let deletePopup = this.state.deletePopupActive ? (
            <div id="delete-server-popup-wrapper" className="delete-server-popup-wrapper">
                <div className="delete-server-popup">
                    <h2>DELETE '{this.props.clickedServerName.toUpperCase()}'</h2>
                    <div className="warning">
                        <p>Are you sure you want to delete <span>{this.props.clickedServerName}</span>? This acton cannot be undone.</p>
                    </div>
                    <h3>ENTER SERVER NAME</h3>
                    <input type="text" onChange={this.updateDeletePopupText}/>
                    {errorText}
                    <div className="options">
                        <h4 onClick={this.closeDeletePopup}>Cancel</h4>
                        <button onClick={this.handleDeleteServer}>Delete Server</button>
                    </div>
                </div>
            </div>
        ) : ""

        return (
            <div id="server-settings-modal-wrapper" className="server-settings-modal-wrapper">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h3>{this.props.clickedServerName.toUpperCase()}</h3>
                        <h2>Overview</h2>
                        {/* <h2>Roles</h2>
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
                        <h2>Bans</h2> */}
                        <div className="divider"></div>
                        <h2 className="delete-button" onClick={this.openDeletePopup}>Delete Server</h2>
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
                                <input id="update-server-name-input" name="name" type="text" defaultValue={this.props.clickedServerName} onChange={this.updateName}/>
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
                            <div className="reset" onClick={this.resetName}>
                                Reset
                            </div>
                            <div className="save" onClick={this.handleSubmit}>
                                Save Changes
                            </div>
                        </div>
                    </div>
                </div>
                {deletePopup}
            </div>
        )
    }
}