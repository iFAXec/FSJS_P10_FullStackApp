import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';


const UpdateCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { credentials, authUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);


    const [updateCourse, setUpdateCourse] = useState({

        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: null

    });

    useEffect(() => {
        if (authUser) {
            setUpdateCourse((prevData) => ({
                ...prevData,
                userId: authUser.id
            }));
        }
    }, [authUser]);




    useEffect(() => {

        const fetchCourseDetail = async () => {
            try {
                const URL = `http://localhost:5000/api/courses/${id}`;
                const response = await fetch(URL);
                const data = await response.json();

                if (!data) {
                    navigate('/notfound')
                    return;
                }

                setUpdateCourse(data);

                if (authUser.id !== data.userId) {
                    navigate('/forbidden')
                }

            } catch (error) {
                console.error('Error fetching course detail', error);
            }
        }
        fetchCourseDetail();
    }, [id, authUser, navigate]);



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdateCourse((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const URL = `http://localhost:5000/api/courses/${updateCourse.id}`;
            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Basic ${btoa(`${credentials.emailAddress}:${credentials.password}`)}`,
                },
                body: JSON.stringify(updateCourse)
            })

            if (response.ok) {
                await navigate('/')
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
                console.log(errors)
            }
            else {
                throw new Error('Updating course failed');
            }

        } catch (error) {
            console.error('Error updating course', error);
            navigate('/notfound');
        }
    }


    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/')
    }

    // console.log(credentials);

    return (
        <div className="wrap">
            <div>
                <h2>Update Course</h2>
            </div>

            {
                errors.length ?
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </div>
                    : null
            }

            <form>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" name="title" type="text" value={updateCourse.title} onChange={handleChange} />

                        <p>By Joe Smith</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" name="description" value={updateCourse.description} onChange={handleChange}>{updateCourse.description}</textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={updateCourse.estimatedTime} onChange={handleChange} />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" value={updateCourse.materialsNeeded} onChange={handleChange}>{updateCourse.materialsNeeded}</textarea>
                    </div>
                </div>
                <button className="button" type="submit" onClick={handleSubmit}>Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>

    );
}

export default UpdateCourse;