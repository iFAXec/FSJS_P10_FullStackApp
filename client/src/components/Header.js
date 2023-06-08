import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';



const Header = () => {
    const { authUser, actions } = useContext(UserContext);

    let headerContent;

    if (authUser) {
        headerContent = (
            <nav>
                <ul className="header--signedin">
                    <li>Welcome, {authUser.firstName}!</li>
                    <li><NavLink to="signoutconfirmation" onClick={actions.signOut}>Sign Out</NavLink></li>
                </ul>
            </nav>
        )

    } else {

        headerContent = (
            <nav>
                <ul className="header--signedin">
                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                    <li><NavLink to="/signin">Sign In</NavLink></li>
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
