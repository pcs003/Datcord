import React from 'react'
import GreetingContainer from "./greeting_container";
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="top-div">
                    <header>
                        <a className="header-logo-link"href="/"><img className="header-logo" src={window.headerLogoURL}/></a>
                        <div className="navlinks">
                            <a href="/">Download</a>
                            <Link to="/whydatcord">Why Datcord?</Link>
                            <a href="/">Propane</a>
                            <a href="/">Safety</a>
                            <a href="/">Support</a>
                        </div>
                        <GreetingContainer />
                    </header>
                    <div className="middle-blob-wrapper">
                        <div className="middle-blob">
                            <h1>Your place to talk</h1>
                            <p>Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Datcord makes it easy to talk every day and hang out more often.</p>
                            <div className="discord-buttons">
                                <a className="white" href="/"><img src={window.downloadIconURL}/>Download for Windows</a>
                                <Link className="black" to="/">Open Discord in your browser</Link>
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
                    
                </div>
                <div className="bottom-div">

                </div>
            </div>
        )
    }
}