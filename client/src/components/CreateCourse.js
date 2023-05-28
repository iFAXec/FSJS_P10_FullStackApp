import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




const CreateCourse = () => {

    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseEstimatedTime, setCourseEstimatedTime] = useState('');
    const [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState('');

    const handleCourseTitleChange = (event) => {
        console.log(event.target.value);
        setCourseTitle(event.target.value);
    }

    const handleCourseDescriptionChange = (event) => {
        console.log(event.target.value)
        setCourseDescription(event.target.value);
    }

    const handleCourseEstimateTimeChange = (event) => {
        setCourseEstimatedTime(event.target.value);
    }

    const handleCourseMaterialsNeededChange = (event) => {
        setCourseMaterialsNeeded(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const courseData = {
                courseTitle,
                courseDescription,
                courseEstimatedTime,
                courseMaterialsNeeded
            }

            const URL = 'http://localhost:5000/api/courses'
            const response = await fetch(URL, {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            })

            if (response.ok) {
                navigate('/')
            } else {
                throw new Error('Course creation failed');
            }

        } catch (error) {
            console.error('Error creating course', error);
        }
    }


    return (

        <div className="wrap">
            <h2>Create Course</h2>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li>
                </ul>
            </div>
            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="courseTitle" type="text" value="" />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="courseDescription"></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.NavLink to ='/';">Cancel</button>
            </form>
        </div>

    );

}

export default CreateCourse;