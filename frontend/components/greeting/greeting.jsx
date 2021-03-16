import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({currentUser, logout}) => {
    const links = () => (
        <nav className="login-link">
            <Link to="/login">Log In</Link>
        </nav>
    )
    const greeting = () => (
        <nav className="greeting-logout">
            <h2>Hi, {currentUser.username}</h2>
            <button className="logout-button" onClick={logout}>Log Out</button>
        </nav>
    )

    return currentUser? greeting() : links();
}

export default Greeting;