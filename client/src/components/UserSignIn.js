import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

/**
 * The signin function checks for user authentication which is received from UserContext
 * If signin is successful then the user is navigated to where is came from
 * Else - unsuccessful message is displayed on the screen
 * @returns - displays a form for signin 
 */


const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();

    const emailRef = useRef(null)
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        /**
         * The location hook is used to check which route user came from
         * To redirect the user upon successful log-in
         */

        let from = '/authenticated'

        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(['Sign-in was unsuccessful'])
            }

        } catch (error) {
            console.error('Signin unsuccessful', error);
            navigate('/error');
        }

    }


    /**
     * The function cancels the operation and directs to the home screen
     * @param {event} event - prevent default submission
     */
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }


    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <div  >
                {<ErrorsDisplay errors={errors} />}

                <form onSubmit={handleSubmit} >
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailRef} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={passwordRef} />
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </div>
    );
}



export default UserSignIn;