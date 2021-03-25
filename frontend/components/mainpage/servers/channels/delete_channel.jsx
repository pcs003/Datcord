import React from 'react'

export default class DeleteChannel extends React.Component {
    constructor(props) {
        super(props)

        this.handleDeleteChannel = this.handleDeleteChannel.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    componentDidMount() {
        document.addEventListener("click", this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick)
    }

    handleClick(e) {
        e.preventDefault();
        console.log(e.target)
        if (e.target.id == "delete-channel-modal-wrapper") {
            this.props.closeForm();
        }
    }

    handleDeleteChannel(e){
        e.preventDefault();
        this.props.deleteChannel(this.props.clickedChannelId).then(action => {
            this.props.fetchChannels();
            this.props.closeForm();
        })
    }

    render() {
        return (
            <div id="delete-channel-modal-wrapper" className="delete-channel-modal-wrapper">
                <div id="delete-channel-modal" className="delete-channel-modal">
                    <div className="header-div">
                        <h1>DELETE CHANNEL</h1>
                        <h3>Are you sure you want to delete ? This cannot be undone</h3>
                    </div>      
                    <div className="delete-cancel">
                        <h4 onClick={this.props.closeForm}>Cancel</h4>
                        <button onClick={this.handleDeleteChannel}>Delete Channel</button>
                    </div>
                </div>
            </div>
        )
    }
}