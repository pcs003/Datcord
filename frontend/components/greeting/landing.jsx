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
                </div>
                <div className="middle-div">
                    
                </div>
                <div className="bottom-div">

                </div>
            </div>
        )
    }
}