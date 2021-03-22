import React from 'react'

export default class CreateServer extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            screenNum: 1,
            forward: true
        }

        this.forwardScreen = this.forwardScreen.bind(this)
        this.backScreen = this.backScreen.bind(this)
    }

    forwardScreen(e) {
        e.preventDefault();
        let currScreen = this.state.screenNum
        this.setState({
            screenNum: currScreen + 1,
            forward: true
        })
    }

    backScreen(e) {
        e.preventDefault();
        let currScreen = this.state.screenNum
        this.setState({
            screenNum: currScreen - 1,
            forward: false
        })
    }

    render() {
        let createServerClass = this.props.isActive ? "create-server-modal" : "create-server-modal inactive"
        let screenClass = "";
        if (this.state.forward === false) {
            if (this.state.screenNum === 1) {
                screenClass = "all-screens back"
            } else if (this.state.screenNum === 2) {
                screenClass = "all-screens second back"
            }
        } else {
            if (this.state.screenNum === 1) {
                screenClass = "all-screens"
            }if (this.state.screenNum === 2) {
                screenClass = "all-screens second forward"
            } else if (this.state.screenNum === 3) {
                screenClass = "all-screens third forward"
            }
        }
        
        
        return (
            <div id="create-server-modal-wrapper" className="create-server-modal-wrapper">
                <div id="create-server-modal" className={createServerClass}>
                    <div className="close-form" onClick={this.props.closeCreateServerForm} >
                        <svg classNamewidth="24" height="24" viewBox="0 0 24 24">
                            <path fill="#c7ccd1" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>    
                        </svg> 
                    </div>
                    <div className={screenClass}>
                        <div className="first-screen">
                            <div className="screen-one-header">
                                <h2>Create a server</h2>
                                <p>Your server is where you and your friends hang out. Make yours and start talking</p>
                            </div>
                            <div className="one-to-two-button" onClick={this.forwardScreen}>
                                <div>
                                    <img src={window.createServerIcon} alt=""/>
                                    <h2>Create My Own</h2>
                                </div>
                                <img className="right-arrow" src={window.rightArrowIcon} alt=""/>
                            </div>
                            <div className="join-existing-div">
                                <h2>Have an invite already?</h2>
                                <button>Join a Server</button>
                            </div>
                        </div>
                        <div className="second-screen">
                            <button onClick={this.forwardScreen}>Forward</button>
                            <button onClick={this.backScreen}>Back</button>
                        </div>
                        <div className="third-screen">
                            <button onClick={this.backScreen}>Back</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}