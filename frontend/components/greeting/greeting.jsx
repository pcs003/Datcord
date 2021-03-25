import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({currentUser, logout}) => {
    const links = () => (
        <nav className="login-link">
            <Link to="/login">Login</Link>
        </nav>
    )
    const greeting = () => (
        <nav className="greeting-logout">
            {/* <button className="logout-button" onClick={logout}>Log Out</button> */}
            <Link to="/channels/1">Open Datcord</Link>
        </nav>
    )

    return currentUser? greeting() : links();
}

export default Greeting;