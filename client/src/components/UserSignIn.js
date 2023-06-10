import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';


const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const location = useLocation();

    const emailRef = useRef(null)
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                <p>Don't have a user account? Click here to <Link to="signup">sign up</Link>!</p>
            </div>
        </div>
    );
}



export default UserSignIn;