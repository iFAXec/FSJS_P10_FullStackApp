import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleSignIn = (name) => {
        setIsUserSignedIn(true);
        setUsername(name)
    }

    let headerContent;

    if (isUserSignedIn) {
        headerContent = (
            <nav>
                <ul className="header--signedin">
                    <li>Welcome, {username}!</li>
                    <li><NavLink to="/">Sign Out</NavLink></li>
                </ul>
            </nav>

        )

    } else {

        headerContent = (
            <nav>
                <ul className="header--signedin">
                    <li><NavLink to="signup">Sign Up</NavLink></li>
                    <li><NavLink to="signin">Sign In</NavLink></li>
                </ul>
            </nav>
        )
    }

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>{headerContent}</nav>
            </div>
        </header>
    );
}

export default Header;
