import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import UserContext from '../context/UserContext';
import ReactMarkdown from 'react-markdown';
import ReactDOMServer from 'react-dom/server';



const CourseDetail = () => {

    const { authUser, credentials } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState();

    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();


    /**
     * The useEffect hook fetches course data with specific id
     * if no course data is received - not found page is displayed
     * otherwise - course data is assigned to CourseDetail variable
     * When an error is received from the server then the user is redirected to error page 
     */
    useEffect(() => {

        const fetchCourseDetail = async () => {
            try {
                const URL = `http://localhost:5000/api/courses/${id}`;
                const response = await fetch(URL);
                const data = await response.json();
                // console.log("🚀 ~ data:", data);

                if (data.message) {
                    navigate('/notfound')
                    return;
                }

                setCourseDetail(data);

            } catch (error) {
                console.error('Error fetching course detail', error);
                navigate('/error');

            }
        }
        fetchCourseDetail();
    }, [id, navigate]);

    // console.log(courseDetail)


    /**
     * If the Course Detail data is slow is responding
     * then Loading... message is displayed 
     */
    if (!courseDetail) {
        return <div>Loading...</div>
    }

    /**
     * The function handles delete operation on the DELETE button
     * @param {event} - event preventDefault submit
     * The try block fetches the course data
     * Obtains the user credentials attached to the course details 
     * Perform delete operation * 
     */
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const URL = `http://localhost:5000/api/courses/${courseDetail.id}`;
            const response = await fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    Authorization: `Basic ${btoa(`${credentials.emailAddress}:${credentials.password}`)}`,
                }
            })

            /**
             * If fetch response is received as positive
             * The try block will perform the DELETE operation and navigate to home route
             * if the fetch response is 400 error
             * the errors variable is updated with the error message
             * Else - a server error is received then error message is displayed to the console
             * and redirected to the error route
             */

            if (response.status === 204) {
                await navigate('/')
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.message);
            }
            else {
                throw new Error('Deleting course failed');

            }

        } catch (error) {
            console.error('Error deleting course', error);
            navigate('/error');
        }
    }

    /**
     * The errors variable is used to display the error message
     */

    if (errors) {
        return <div>{errors}</div>
    }

    // console.log("🚀 ~ courseDetail:", courseDetail);



    /**
     * If the user has created the Course
     * The navigation bar will display 'Update Course' and 'Delete Course' button along with 'Return to List'
     * Else the navigation bar will display only 'Return to List' button
     */

    let navBar;

    if (authUser && authUser.id === courseDetail.userId) {
        navBar = (
            <div>
                <div className="actions--bar">
                    <div className="wrap">
                        <NavLink className="button" to={'update'}>Update Course</NavLink>
                        <NavLink className="button" to="/" onClick={handleDelete}>Delete Course</NavLink>
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                </div>
            </div>
        )

    } else {

        navBar = (
            <div>
                <div className="actions--bar">
                    <div className="wrap">
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                </div>
            </div>
        )

    }

    //Convert description and materials needed to string before using in the reactMarkdown tags
    const descriptionString = ReactDOMServer.renderToString(courseDetail.description);
    const contentString = ReactDOMServer.renderToString(courseDetail.materialsNeeded);


    /**
     * The function returns the course detail html
     * Obtains the data from course data and displays within the html
     */
    return (
        <div>
            <div>{navBar}</div>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courseDetail.title}</h4>
                            <p>By {courseDetail.User.firstName} {courseDetail.User.lastName}</p>
                            <ReactMarkdown>{descriptionString}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetail.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{contentString}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default CourseDetail;