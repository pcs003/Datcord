import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({currentUser, logout}) => {
    const links = () => (
        <nav className="login-link">
            <Link to="/login">Login</Link>
        </nav>
    )
    const greeting = () => {
        let thisLink = `/channels/@me/${currentUser.id}`
        return (
            <nav className="greeting-logout">
                <Link to={thisLink}>Open Datcord</Link>
            </nav>
        )
    }

    return currentUser? greeting() : links();
}

export default Greeting;