import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserSignIn = () => {

    const emailRef = useRef(null)
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);

        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        }

        try {
            const response = await fetch('http://localhost:5000/api/courses', fetchOptions);

            if (response.status === 200) {
                const user = await response.json();
                console.log(`SUCCESS, ${user.email} is now signed in!`);
            } else if (response.status === 401) {
                setErrors(['Sign-in was unsuccessful']);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error('Signin unsuccessfull', error);
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