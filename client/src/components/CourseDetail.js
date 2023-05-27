import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

const CourseDetail = () => {

    const [courseDetail, setCourseDetail] = useState(null);
    const { id } = useParams();
    console.log("🚀 ~ id:", id);

    useEffect(() => {

        const fetchCourseDetail = async () => {
            try {
                const URL = `http://localhost:5000/api/courses/${id}`;
                const response = await fetch(URL);
                const data = await response.json();
                setCourseDetail(data);
            } catch (error) {
                console.error('Error fetching course detail', error);
            }
        }
        fetchCourseDetail();
    }, [id]);

    if (courseDetail === null) {
        return <div>Loading...</div>
    }

    console.log("courseDetail:", courseDetail);

    const materialsNeededArray = courseDetail.materialsNeeded.split('\n')
    // console.log("🚀 ~ materialsNeededArray:", materialsNeededArray);
    const materialNeeded = materialsNeededArray.map((material, index) => (
        <li key={index}>{material.substring(2)}</li>
    ));


    return (
        <div>
            <div className="actions--bar">
                <div className="wrap">
                    <NavLink className="button" to={`courses/${id}/update`}>Update Course</NavLink>
                    <NavLink className="button" to="#">Delete Course</NavLink> {/* //FIXME - update to  */}
                    <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                </div>
            </div>

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
                            {/* //FIXME - the app breaks with this conditional statement */}
                            {courseDetail.materialsNeeded.length > 0 ?
                                (<ul className="course--detail--list">
                                    {materialNeeded}
                                </ul>)
                                :
                                (<p> No materials needed for this course</p>)}
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )

}

export default CourseDetail;