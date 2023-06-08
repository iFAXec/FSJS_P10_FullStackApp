import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    });

    //When user updated input field 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData((prevData) => ({ ...prevData, [name]: value }))
    }

    //When user submits the form 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const URL = 'http://localhost:5000/api/courses';
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(courseData),
            })
            // console.log("🚀 ~ response:", response);

            if (response.ok) {
                navigate('/')
            } else {
                throw new Error('Course creation failed');
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




    return (

        <div className="wrap">
            <h2>Create Course</h2>
            {
                errors.length ?

                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li key={error}>Please provide a value for '{error[0].toUpperCase() + error.slice(1)}'</li>)
                            }
                        </ul>
                    </div>
                    : null
            }


            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="title" type="text" value={courseData.title} onChange={handleChange} />
                        {/* //FIXME - Course Title is readonly */}

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