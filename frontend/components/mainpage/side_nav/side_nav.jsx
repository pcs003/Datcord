import React from 'react'
import { Link } from 'react-router-dom'

export default class SideNav extends React.Component {
    constructor(props){
        super(props)

        this.abbreviate = this.abbreviate.bind(this)
        this.contextMenu = this.contextMenu.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.leaveServer = this.leaveServer.bind(this)

        this.state = {
            contextMenuVisible: false,
            cmX: "100px",
            cmY: "100px",
            clickedServer: { id: "", owner_id: ""}
        }
    }

    componentDidMount() {
        this.props.getServers()
        document.addEventListener("click", this.handleClick)
    }

    handleClick(e){
        e.preventDefault();
        this.setState({
            contextMenuVisible: false,
        })
    }

    abbreviate(str) {
        return str.split(" ").map((word) => word.slice(0,1)).join("");
    }

    contextMenu(e) {
        e.preventDefault();
        this.setState({
            contextMenuVisible: true,
            cmX: e.pageX + "px",
            cmY: e.pageY + "px",
            clickedServer: this.props.servers.find((server) => ( server.id == e.target.id))

        })
        
    }

    leaveServer(e) {
        e.preventDefault();
        this.props.leaveServer({serverId: this.state.clickedServer.id}).then(() => {
            this.props.getServers();
            this.props.history.push(`/channels/@me`)
        })
    }


    render() {
        //create all server icons
        let serverEles = null;
        if (this.props.servers != {}) {
            serverEles = this.props.servers.map((server, i) => {
                let serverLink = `/channels/${server.id}`
                let linkClass = server.id == this.props.currentServerId ? "selected" : "";
                let indicatorClass = server.id == this.props.currentServerId ? "selected-indicator active" : "selected-indicator"
                return (
                    <Link key={i} className={linkClass} id={server.id} onContextMenu={this.contextMenu} to={serverLink}>
                        <div className={indicatorClass}></div>
                        <div id={server.id} className="nav-tab-frame">
                            <h3 id={server.id} className="nav-tab">{this.abbreviate(server.name)}</h3>
                        </div>
                    </Link>
                )
            })
        }

        //handle context menu 
        let contextMenuClass = this.state.contextMenuVisible ? "server-context-menu active" : "context-menu"
        let contextMenuStyle = {
            position: "absolute", 
            top: this.state.cmY, 
            left: this.state.cmX, 
            
        }

        let updateLeaveOption = this.props.currentUser.id == this.state.clickedServer.owner_id ? (
            <div className="update-server-div" onClick={this.props.openServerSettings} >
                <span id={this.state.clickedServer.id} >Server Settings</span>
            </div>
        ) : (
            <div className="leave-server-div" onClick={this.leaveServer}>
                <span>Leave Server</span>
            </div>
        );

        let serverContextMenu = this.state.contextMenuVisible ? (
            <div className={contextMenuClass} style={contextMenuStyle}>
                <div className="mark-read-div">
                    <span>Mark As Read</span>
                </div>
                <div className="divider"></div>
                {updateLeaveOption}
            </div>
        ) : "";
        return (
            <nav className="side-nav">
                <Link id="@me" to={'/channels/@me'}>
                    <div className="nav-tab-frame">
                        <img className="nav-tab robot" src={window.whiteDatcordRobot} alt=""/>
                    </div>
                </Link>
                <span className="nav-divider"></span>
                {serverEles}
                <div onClick={this.props.openCreateServerForm} className="nav-tab-frame default">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#43B581" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>    
                    </svg> 
                </div>
                <div className="nav-tab-frame default">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#43B581" d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"></path>    
                    </svg> 
                </div>
                <span className="nav-divider"></span>
                <div className="nav-tab-frame default">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#43B581" d="M16.293 9.293L17.707 10.707L12 16.414L6.29297 10.707L7.70697 9.293L11 12.586V2H13V12.586L16.293 9.293ZM18 20V18H20V20C20 21.102 19.104 22 18 22H6C4.896 22 4 21.102 4 20V18H6V20H18Z"></path>    
                    </svg> 
                </div>
                {serverContextMenu}
            </nav>
        )
    }
}

