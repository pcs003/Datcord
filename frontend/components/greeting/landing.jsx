import React from 'react'
import GreetingContainer from "./greeting_container";
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.moveRocket = this.moveRocket.bind(this)

        this.state = {
            rocketStart: false
        }
    }

    moveRocket(e) {
        e.preventDefault();
        this.setState({
            rocketStart: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    rocketStart:false
                })
            }, 4000)
        })
    }
    render() {
        let rocketClass = "propane-rocket"
        if (this.state.rocketStart) {
            rocketClass = "propane-rocket finished"
        }
        let thisLink = '/login'
        if (this.props.currentUser) {
            thisLink=`/channels/@me/${this.props.currentUser.id}`
        }
        return (
            <div>
                <div className="top-div">
                    <img className={rocketClass} src={window.rocket} alt=""/>
                    <header>
                        <a className="header-logo-link"href="/"><img className="header-logo" src={window.headerLogoURL}/></a>
                        <div className="navlinks">
                            <a href="http://www.parthcshah.com">My Website</a>
                            <Link to="/whydatcord">Why Datcord?</Link>
                            <a onClick={this.moveRocket}>Propane</a>
                            <a href="https://www.linkedin.com/in/parth-shah-b6265763/">LinkedIn</a>
                            <a href="https://angel.co/u/parth-shah-190">AngelList</a>
                        </div>
                        <GreetingContainer />
                    </header>
                    <div className="middle-blob-wrapper">
                        <div className="middle-blob">
                            <h1>Your place to talk</h1>
                            <p>Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Datcord makes it easy to talk every day and hang out more often.</p>
                            <div className="discord-buttons">
                                <a className="white" href="https://github.com/pcs003/Datcord"><img src={window.downloadIconURL}/>Check out my Github</a>
                                <Link className="black" to={thisLink}>Open Discord in your browser</Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg">
                        <img className="slice-four" src={window.landingPageSlice4URL} />
                        <img className="slice-three" src={window.landingPageSlice3URL} />
                        <img className="slice-two" src={window.landingPageSlice2URL} />
                        <img className="slice-one" src={window.landingPageSlice1URL} />
                        <img className="castle-one" src={window.landingPageCastle1URL} />
                        <img className="castle-two" src={window.landingPageCastle2URL} />
                        <img className="large-lb-cloud-two" src={window.landingPageLargeLBCloud2URL} />
                        <img className="large-lb-cloud-one" src={window.landingPageLargeLBCloud1URL} />
                        <img className="large-b-cloud-one-b" src={window.landingPageLargeBCloud1URL} />
                        <img className="large-b-cloud-two" src={window.landingPageLargeBCloud2URL} />
                        <img className="large-b-cloud-one-a" src={window.landingPageLargeBCloud1URL} />
                        <img className="medium-b-cloud" src={window.landingPageMediumBCloudURL} />
                        <img className="medium-lb-cloud" src={window.landingPageMediumLBCloudURL} />
                        <img className="medium-p-cloud" src={window.landingPageMediumPCloudURL} />
                        <img className="medium-db-cloud" src={window.landingPageMediumDBCloudURL} />
                        <img className="diamond" src={window.landingPageDiamondURL} />
                        <img className="floating-ship" src={window.landingPageFloatingShipURL} />
                        <img className="small-bottom-cloud-one" src={window.landingPageSmallBottomCloud1URL} />
                        <img className="small-bottom-cloud-two" src={window.landingPageSmallBottomCloud2URL} />
                        <img className="balloon-guy" src={window.landingPageBalloonGuyURL} />
                        <img className="city" src={window.landingPageCityURL} />
                        <img className="man-and-frog" src={window.landingPageManFrogURL} />
                        <img className="group" src={window.landingPageGroupURL} />

                    </div>
                </div>
                <div className="middle-div">
                    <div className="section one">
                        <img className = "chat-img" src={window.landingPageMid1URL} />
                        <div className = "blurb">
                            <h1>An invite-only place with plenty of room to talk</h1>
                            <p>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
                        </div>
                    </div>
                    <div className="section two">
                        <img className = "voice-img" src={window.landingPageMid2URL} />
                        <div className = "blurb">
                            <h1>Where hanging out is easy</h1>
                            <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
                        </div>
                    </div>
                    <div className="section three">
                        <img className = "server-img" src={window.landingPageMid3URL} />
                        <div className = "blurb">
                            <h1>From a few to a fandom</h1>
                            <p>Get a community of any size running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
                        </div>
                    </div>
                    <div className="section four">
                        <img className = "tech-img" src={window.landingPageMid4URL} />
                        <div className = "blurb">
                            <h1>Reliable tech for staying close</h1>
                            <p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
                        </div>
                    </div>
                    <div className="end-middle">
                        <img className="sparkles" src={window.landingPageSparklesURL} />
                        <h2>Ready to start your journey?</h2>
                        <GreetingContainer />
                    </div>
                </div>
                <div className="bottom-div">
                    
                </div>
            </div>
        )
    }
}