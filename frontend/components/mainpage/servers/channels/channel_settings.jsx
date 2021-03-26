import React from 'react'

export default class ChannelSettings extends React.Component {
    constructor(props) {
        super(props)

        this.updateName = this.updateName.bind(this)
        this.resetName = this.resetName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        let thisChannel = Object.values(this.props.currentServer.channels).find(channel => channel.id == this.props.clickedChannelId);

        this.state = {
            name: thisChannel.name,
            originalName: thisChannel.name,
            justloaded: true,
            deletePopupActive: false,
            deletePopupText: "",
            deleteFailed: false
        }
    }

    // componentDidMount() {
    //     let thisChannel = Object.values(this.props.currentServer.channels).find(channel => channel.id == this.props.clickedChannelId);
    //     this.setState({
    //         name: thisChannel.name,
    //         originalName: thisChannel.name
    //     })
    // }

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
        document.getElementById("update-channel-name-input").value = this.state.originalName;
    }

    handleSubmit(e) {
        e.preventDefault();
        let thisChannel = Object.values(this.props.currentServer.channels).find(channel => channel.id == this.props.clickedChannelId);
        let updated = Object.assign({}, thisChannel);
        updated.name = this.state.name;
        this.props.updateChannel(updated).then((action) => {
            this.props.fetchChannels(this.props.currentServer.id);
            this.setState({
                originalName: action.channel.name
            })
        });
        
        
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
            <div id="channel-settings-modal-wrapper" className="channel-settings-modal-wrapper">
                <div className="sidebar">
                    <div className="sidebar-content">
                        <h3>CHANNEL NAME</h3>
                        <h2>Overview</h2>
                        <div className="divider"></div>
                        <h2 className="delete-button" onClick={this.props.openDeleteChannelForm}>Delete Channel</h2>
                    </div>
                </div>
                <div className="content">
                    <div className="close-form-container" >
                        <div className="close-form" onClick={this.props.closeChannelSettings} >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#dcddde" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>    
                            </svg> 
                        </div>
                        <div className="esc-text">ESC</div>
                    </div>
                    <div className="overview">
                        <h1>OVERVIEW</h1>
                        <div className="change-name-wrapper">
                            <h2>CHANNEL NAME</h2>
                            <input id="update-channel-name-input" type="text" defaultValue={this.state.originalName} onChange={this.updateName}/>
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
            </div>
        )
    }
}