import React from 'react'
import Popup from 'react-popup'

export default class ChannelIndex extends React.Component {
    constructor(props) {
        super(props)

        this.toggleTextChannelOpen = this.toggleTextChannelOpen.bind(this)
        this.toggleVoiceChannelOpen = this.toggleVoiceChannelOpen.bind(this)
        this.selectTextChannel = this.selectTextChannel.bind(this)
        this.selectVoiceChannel = this.selectVoiceChannel.bind(this)
        this.contextMenu = this.contextMenu.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            selectedTextChannelId: 1,
            selectedVoiceChannelId: 1,
            textChannelsOpen: true,
            voiceChannelsOpen: true,
            contextMenuVisible: false,
            cmX: "100px",
            cmY: "100px",
            clickedChannel: {id:1}
        }
    }

    componentDidMount() {
        console.log("hello")
        this.props.fetchServers()
        this.props.fetchChannels(this.props.match.params.server_id).then(action => {

            this.setState({
                selectedTextChannelId: Object.values(action.channels)[0].id
            })
            this.props.setCurrentChannelInfo(Object.values(action.channels)[0].name, Object.values(action.channels)[0].id)
        });
        document.addEventListener("click", this.handleClick)
    }

    toggleTextChannelOpen(e) {
        e.preventDefault();
        let current = this.state.textChannelsOpen;
        this.setState({
            textChannelsOpen: !current
        })
    }

    toggleVoiceChannelOpen(e) {
        e.preventDefault();
        let current = this.state.voiceChannelsOpen;
        this.setState({
            voiceChannelsOpen: !current
        })
    }

    selectTextChannel(e) {
        e.preventDefault();
        // this.setState({
        //     selectedTextChannelId: e.target.id
        // })
        let thisChannel = this.props.channels.find(channel => channel.id == e.target.id);
        this.props.setCurrentChannelInfo(thisChannel.name, thisChannel.id)
    }

    selectVoiceChannel(e) {
        e.preventDefault();
        this.setState({
            selectedVoiceChannelId: e.target.id
        })
        Popup.alert("voice channels still under construction")
    }

    contextMenu(e) {
        e.preventDefault();
        this.setState({
            contextMenuVisible: true,
            cmX: e.pageX + "px",
            cmY: e.pageY + "px",
            clickedChannel: this.props.channels.find((channel) => ( channel.id == e.target.id))

        })
        this.props.setClickedChannelId(e.target.id)
        
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick)
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            contextMenuVisible: false,
        })
    }
    

    render() {
        let textChannels = [];
        let voiceChannels = [];
        if (this.props.channels) {
            
            for (let i = 0; i < this.props.channels.length; i++) {

                if (this.props.channels[i].channel_type === "text" && this.state.textChannelsOpen) {
                    let liClass = this.props.currentChannelId == this.props.channels[i].id ? "selected text" : "";

                    textChannels.push(
                        <li className={liClass} id={this.props.channels[i].id} onClick={this.selectTextChannel} onContextMenu={this.contextMenu} key={i}>
                            <svg id={this.props.channels[i].id} width="17" height="17" viewBox="0 0 20 20">
                                <path fill="#72767d" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>    
                            </svg> 
                            <span id={this.props.channels[i].id}>{this.props.channels[i].name}</span>
                        </li>
                    )
                }

                if (this.props.channels[i].channel_type === "voice" && this.state.voiceChannelsOpen) {
                    let liClass = this.state.selectedVoiceChannelId == this.props.channels[i].id ? "selected voice" : "";
                    
                    voiceChannels.push(
                        <li className={liClass} id={this.props.channels[i].id} onClick={this.selectVoiceChannel} key={i}>
                            <svg id={this.props.channels[i].id} width="18" height="18" viewBox="0 0 20 20">
                                <path fill="#72767d" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"></path>    
                            </svg> 
                            <span id={this.props.channels[i].id}>{this.props.channels[i].name}</span>
                        </li>
                    )
                }
            }
        }
        
        let textArrowClass = this.state.textChannelsOpen ? "" : "closed";
        let voiceArrowClass = this.state.voiceChannelsOpen ? "" : "closed";

        // handles owner options
        let channelCreateButton = "";
        if (this.props.currentServer) {
            
            if (this.props.currentServer.owner_id == this.props.currentUser.id) {
                channelCreateButton = (
                    <svg className="create-button" onClick={this.props.openCreateChannelForm} width="18" height="18" viewBox="0 0 18 18">
                        <polygon fill="#8E9297" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                    </svg>
                )
            }
        }

        //handle context menu
        let contextMenuClass = this.state.contextMenuVisible ? "channel-context-menu active" : "channel-context-menu"
        let contextMenuStyle = {
            position: "absolute", 
            top: this.state.cmY, 
            left: this.state.cmX, 
            
        }

        let channelOptions = ""
        if (this.props.currentServer && this.props.currentUser.id == this.props.currentServer.owner_id ) {
            channelOptions = (
                <div>
                    <div id={this.state.clickedChannel.id} className="edit-channel-div" >
                        <span id={this.state.clickedChannel.id} >Edit Channel</span>
                    </div>
                    <div className="divider"></div>
                    <div id={this.state.clickedChannel.id} className="delete-channel-div" onClick={this.props.openDeleteChannelForm}>
                        <span id={this.state.clickedChannel.id} >Delete Channel</span>
                    </div>
                </div>
            )
        }
            
        let channelContextMenu = this.state.contextMenuVisible ? (
            <div className={contextMenuClass} style={contextMenuStyle}>
                <div className="mark-read-div">
                    <span>Mark As Read</span>
                </div>
                <div className="divider"></div>
                {channelOptions}
            </div>
        ) : "";

        return (
            <div className="channel-nav">
                <div onClick={this.toggleTextChannelOpen} className="channels-title text">
                    <svg className={textArrowClass} width="12" height="12" viewBox="0 0 24 24">
                        <path fill="#8E9297" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>    
                    </svg> 
                    <h2>TEXT CHANNELS</h2>
                    {channelCreateButton}
                </div>
                
                <ul className="channels-list text">
                    {textChannels}
                </ul>
                <div onClick={this.toggleVoiceChannelOpen} className="channels-title voice">
                    <svg className={voiceArrowClass} width="12" height="12" viewBox="0 0 24 24">
                        <path fill="#8E9297" d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"></path>    
                    </svg>
                    <h2>VOICE CHANNELS</h2>
                    {channelCreateButton}
                </div>
                <ul className="channels-list voice">
                    {voiceChannels}
                </ul>
                <Popup />
                {channelContextMenu}
            </div>
        )
    }
}