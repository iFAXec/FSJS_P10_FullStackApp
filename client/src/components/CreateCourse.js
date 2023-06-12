import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";



const CreateCourse = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const { authUser, credentials } = useContext(UserContext);

    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: null
    });



    useEffect(() => {
        if (authUser) {
            setCourseData((prevData) => ({
                ...prevData,
                userId: authUser.id
            }));
        }
    }, [authUser]);

    //When user updated input field 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }))
    }


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

    //When user submits the form 
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

    //When user clicks the cancel button
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    // console.log(credentials);

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