import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const UpdateCourse = () => {
    const navigate = useNavigate();
    const [updateCourse, setUpdateCourse] = useState({});


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateCourse((prevData) => ({ ...prevData, [name]: value }))
    }

    console.log(updateCourse);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const URL = `http://localhost:5000/api/courses/${updateCourse.id}`;
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateCourse)
            })

            if (response.ok) {
                navigate('/')
            } else {
                throw new Error('Updating course failed');
            }

        } catch (error) {
            console.error('Error updating course', error);
        }
    }


    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/')
    }

    return (

        <div className="wrap">
            <h2>Update Course</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value={updateCourse.title} onChange={handleChange} />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription" onChange={handleChange}>{updateCourse.description}</textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={updateCourse.estimatedTime} onChange={handleChange} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange}>{updateCourse.materialsNeeded}</textarea>
                    </div>
                </div>
                <button className="button" type="submit" onClick={handleSubmit}>Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>

    );
}

export default UpdateCourse;