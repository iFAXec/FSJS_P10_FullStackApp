import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';





const UserSignIn = () => {
    const { actions } = useContext(UserContext);

    const emailRef = useRef(null)
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {
            emailAddress: emailRef.current.value,
            password: passwordRef.current.value
        }



        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate('/')
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
            <div>
                {errors.length > 0 ? (
                    <div>
                        <h2>Validation errors</h2>
                        <div>
                            <ul>
                                {errors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                        </div>
                    </div>
                )
                    : null
                }

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