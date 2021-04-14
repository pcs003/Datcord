import React from 'react'
import ChannelMessageForm from './channel_message_form'

export default class ChannelMessages extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }


        this.bottom = React.createRef();
        this.generateTimeStamp = this.generateTimeStamp.bind(this)
        this.generateTimeStampRepeat = this.generateTimeStampRepeat.bind(this)
        this.monthDays = this.monthDays.bind(this)
    }

    componentDidUpdate() {
        console.log(this.bottom)
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView(false);
        }
        
    }

    monthDays(month) {
        if ([1,3,5,7,8,10,12].includes(month)){
            return 31;
        } else if ([4,6,9,11].includes(month)) {
            return 30;
        } else {
            return 28;
        }
    }

    generateTimeStamp(date) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        let dateObj = new Date(date);

        let offset = dateObj.getTimezoneOffset()/60;

        var msgD = parseInt(date.slice(8,10))
        var msgM = parseInt(date.slice(5,7))
        var msgY = parseInt(date.slice(0,4))

        if (parseInt(date.slice(11, 13)) - offset < 0) {
            msgD--;
            if (msgD == 0) {
                msgM--;
                if (msgM == 0) {
                    msgY--;
                    msgM = 12;
                }
                msgD = this.monthDays(msgM)
            }
        }

        if (parseInt(dd) == msgD && parseInt(mm) == msgM && parseInt(yyyy) == msgY) {
            let timeH = (parseInt(date.slice(11, 13)) + 24 - offset) % 24
            let timeM = date.slice(14, 16)
            if (timeH >= 12) {
                if (timeH > 12) {
                    timeH -= 12;
                }
                return (`Today at ${timeH.toString()}:${timeM.padStart(2, '0')} PM`)
            }

            if (timeH == 0) {
                timeH = 12;
            }
            return (`Today at ${timeH.toString()}:${timeM.padStart(2, '0')} AM`)
        } else if (parseInt(dd) == msgD + 1 && parseInt(mm) == msgM && parseInt(yyyy) == msgY) {
            let timeH = parseInt(date.slice(11, 13))
            let timeM = date.slice(14, 16)
            if (timeH > 12) {
                timeH -= 12;
                return (`Yesterday at ${timeH.toString() + ":" + timeM.padStart(2, '0')} PM`)
            }
            return (`Yesterday at ${timeH.toString() + ":" + timeM.padStart(2, '0')} AM`)
        } else {
            return (`${msgM}/${msgD.toString().padStart(2,'0')}/${msgY}`)
        }

        
    }

    generateTimeStampRepeat(date) {

        

        let timeH = parseInt(date.slice(11, 13))
        let timeM = date.slice(14, 16)
        if (timeH > 12) {
            timeH -= 12;
            return (`${timeH.toString()}:${timeM.padStart(2, '0')} PM`)
        }
        return (`${timeH.toString()}:${timeM.padStart(2, '0')} AM`)
    }

    render() {
        let colors = ["#00C09A", "#008369", "#00D166", "#008E44", "#0099E1", "#006798", "#A652BB", "#7A2F8F", "#FD0061", "#BC0057", "#F8C300", "#CC7900", "#F93A2F", "#A62019", "#91A6A6", "#969C9F", "#596E8D", "#4E6F7B"]
        

        let thisServer = this.props.servers.find(server => {
            return this.props.match.params.server_id == server.id 
        })

        let serverMembers = []
        if (thisServer) {
            serverMembers = thisServer.members
            console.log(serverMembers)
        }

        const messageListItems = []
        
        this.props.channelMessages
        .sort( (a,b) => {
            if (a.created_at > b.created_at) {
                return 1
            } else {
                return -1
            }

        })
        .forEach((message,i) => {
            let author = serverMembers.find(member => {
                return member.id == message.author_id
            })
            let thisColor=""
            let authorName="";
            if (author) {
                authorName = author.username;
                thisColor = colors[author.id % colors.length];
            }

            if (i >= 1) {
                let prevDate = this.props.channelMessages[i - 1]
            }


            if (i >= 1 && this.props.channelMessages[i - 1].author_id === message.author_id) {
                console.log("repeat")
                messageListItems.push(
                    <li className="repeat" key={message.id} >
                        <div className="message-info">
                            <span className="timestamp">{this.generateTimeStampRepeat(message.created_at)}</span>
                            <h3>{message.body}</h3>
                        </div>
                    </li>
                );
            } else {
                messageListItems.push(
                    <li key={message.id} >
                        <div className="current-user-pic" style={{backgroundColor: `${thisColor}`}}>
                            <img className="default-profile-pic" src={window.whiteDatcordRobot} alt=""/>
                        </div>
                        <div className="message-info">
                            <h2>{authorName} <span className="timestamp">{this.generateTimeStamp(message.created_at)}</span></h2>
                            <h3>{message.body}</h3>
                        </div>
                        
                    </li>
                )
            }
            
        })

        let thisChannel = this.props.currentChannel || {name:""}

        return (
            <div className="messaging-div">
                <div className="all-messages-wrapper">
                    <ul>
                        {messageListItems}
                        <div ref={this.bottom} />
                    </ul>
                    
                </div>
                <ChannelMessageForm createChannelMessage={this.props.createChannelMessage} currentChannel={thisChannel} getChannelMessages={this.props.getChannelMessages} currentUser={this.props.currentUser} match={this.props.match}/>
            </div>
            
        )
    }
}