import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import UserContext from '../context/UserContext';
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'



const CourseDetail = () => {

    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();



    useEffect(() => {

        const fetchCourseDetail = async () => {
            try {
                const URL = `http://localhost:5000/api/courses/${id}`;
                const response = await fetch(URL);
                const data = await response.json();
                setCourseDetail(data);

            } catch (error) {
                console.error('Error fetching course detail', error);
                navigate('/notfound');

            }
        }
        fetchCourseDetail();
    }, [id]);

    // console.log(courseDetail)

    if (courseDetail === null) {
        return <div>Loading...</div>
    }

    // console.log("courseDetail:", courseDetail);

    const regex = /^\*\s*/gm;
    const materialList = courseDetail.materialsNeeded ?
        courseDetail.materialsNeeded
            .replace(regex, '')
            .split('\n')
            .filter((item) => item.trim() !== '')
        : [];

    let content;
    if (materialList.length > 0) {
        content = (<ul className="course--detail--list">
            {materialList.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>)
    } else {
        content = <p> No materials needed for this course</p>;
    }

    console.log("🚀 ~ courseDetail:", courseDetail);
    let navBar;

    if (authUser && authUser.id === courseDetail.userId) {
        navBar = (
            <div>
                <div className="actions--bar">
                    <div className="wrap">
                        <NavLink className="button" to={'update'}>Update Course</NavLink>
                        <NavLink className="button" to="#">Delete Course</NavLink> {/* //FIXME - update to  */}
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
                            <p>By {courseDetail.name}</p>
                            <p>{courseDetail.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courseDetail.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            {content}
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )

}

export default CourseDetail;