import React from 'react'
import GreetingContainer from "./greeting_container";

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="top-div">
                    <header>
                        <a className="header-logo-link"href="/"><img className="header-logo" src={window.headerLogoURL}/></a>
                        <div className="navlinks">
                            <a href="/">Download</a>
                            <a href="/">Why Discord?</a>
                            <a href="/">Nitro</a>
                            <a href="/">Safety</a>
                            <a href="/">Support</a>
                        </div>
                        <GreetingContainer />
                    </header>
                    <div className="middle-blob">
                        <h1>Your place to talk</h1>
                        <p>Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.</p>
                        
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