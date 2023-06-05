import React, { useState, useRef, } from 'react'
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const firstName = useRef(null)
    const lastName = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: email.current.value,
            password: password.current.value
        }

        try {

            const URL = 'http://localhost:5000/api/users';
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(URL, fetchOptions)
            console.log("🚀 ~ response:", response);

            if (response.status === 201) {
                console.log(`${user.firstName} has successfully signed-in `);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error('Issue signing up');
            }

        } catch (error) {
            console.error('Signup failed', error);
            navigate('/error')

        }

    }


    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <div>
                <div>
                    {errors.length ?
                        <div>
                            <h2 className='validation--errors--label'> Validation errors</h2>
                            <div className='validation--errors'>
                                <ul>
                                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                                </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName" >First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={email} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/">sign in</Link>!</p>
            </div>
        </div>
    );
}

export default UserSignUp;