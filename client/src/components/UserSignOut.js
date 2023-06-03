import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const UserSignOut = () => {

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleSignOut = () => {
        setIsUserSignedIn(false);
        setUsername('');
    }

    let signOut;

    if (isUserSignedIn) {

        signOut = (

            <nav>
                <ul className="header--signedin">
                    <li>Welcome, {username}!</li>
                    <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
                </ul>
            </nav>

        )
    }

    return (
        <nav>{signOut}</nav>
    );
}

export default UserSignOut;