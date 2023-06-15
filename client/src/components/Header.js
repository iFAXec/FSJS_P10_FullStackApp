import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';


/**
 * The Header function displays the header navigation bar on each component when mounted.
 * @returns - the navigation links
 */
const Header = () => {
    const { authUser, actions } = useContext(UserContext);


    /**
     * If the user is logged in, then the name of the user appear on the header navigation bar
     * Along with signout button
     * If the user is not signedin, then the signin and signout links appear on the header     * 
     */

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
