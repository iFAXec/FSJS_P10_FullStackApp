import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";



const CreateCourse = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const { authUser, credentials } = useContext(UserContext);

    /**
     * The coursesData is initialised to empty string
     */

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: null
    });


    /**
     * The useEffect hok checks if the user is authorised
     * By comparing the course Id with the authUser id
     */
    useEffect(() => {
        if (authUser) {
            setCourseData((prevData) => ({
                ...prevData,
                userId: authUser.id
            }));
        }
    }, [authUser]);

    /**
     * The function handles looks for changes carried out in the form field 
     * @param {event} event gets the value from the target field
     * Updates the courseData  variable with the new change
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }))
    }

    /**
     * The validateFields checks for errors when any field is missing
     * checkErrors variable is initiated with an empty array
     * If any field is missing, the input field is pushed to the empty array
     * errors variable is checked updated with the setErrors function
     * @returns a boolean by checking the condition if the array has any elements
     */
    const validateFields = () => {

        const checkErrors = [];

        if (courseData.title.trim() === '') {
            checkErrors.push('title')
        }

        if (courseData.description.trim() === '') {
            checkErrors.push('description')
        }

        if (courseData.estimatedTime.trim() === '') {
            checkErrors.push('estimatedTime')
        }

        if (courseData.materialsNeeded.trim() === '') {
            checkErrors.push('materialsNeeded')
        }

        setErrors(checkErrors);
        return checkErrors.length === 0;
    }

    /**
     * @param {even} event - prevents the default submission of the form
     * The handle Submit function checks if there are any missing field
     * fetches the courses data and obtains the authorisationin
     * Converts the courseData    
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValid = await validateFields();

        if (isValid === false) {
            return;
        }

        try {

            const URL = 'http://localhost:5000/api/courses';
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Basic ${btoa(`${credentials.emailAddress}:${credentials.password}`)}`,
                },
                body: JSON.stringify(courseData),
            })
            // console.log("🚀 ~ response:", response);

            /**
             * If the response is okm then the user is directed to the home screen
             * else if these was an error, errors variable is updated the error message
             * Else - checks any other error
             * catch block will catch any other error message.             * 
             */

            if (response.status === 201) {
                await navigate('/')
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error('course creation failed');
            }

        } catch (error) {
            console.error('Error creating course', error);
        }
    }

    /**
     * The function cancels submission and redirects to the home screen
     * @param {event} event - prevent auto submission
     */
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    // console.log(credentials);

    /**
     * The return statement checks for any error for any missing field
     * Displays form for updating.
     */

    return (

        <div className="wrap">
            <h2>Create Course</h2>

            {
                errors.length ?

                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li key={error}>Please provide a value for '{error}'</li>)}
                        </ul>
                    </div>
                    : null
            }


            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="title" type="text" value={courseData.title} onChange={handleChange} />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="description" value={courseData.description} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={courseData.estimatedTime} onChange={handleChange} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={courseData.materialsNeeded} onChange={handleChange} ></textarea>
                    </div>
                </div>
                <button className="button" type="submit" onClick={handleSubmit}>Create Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div >

    );

}

export default CreateCourse;