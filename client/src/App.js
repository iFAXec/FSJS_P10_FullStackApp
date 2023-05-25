import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

//App Components
import Home from './components/Home';
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UpdateCourse from './components/UpdateCourse';


const App = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const URL = 'http://localhost:5000/api/courses';
      const response = await fetch(URL);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching course', error);
    }
  }

  useEffect(() => {
    try {
      const courses = fetchCourses();
      console.log("🚀 ~ file: App.js:20 ~ useEffect ~ courses:", courses)
    } catch (error) {
      console.error('Error with useEffect hook', error);
    }
  }, []);


  return (

    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-detail' element={<CourseDetail />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/error' element={<Error />} />
        <Route path='/forbidden' element={<Forbidden />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/update-course' element={<UpdateCourse />} />
      </Routes>

      {/* <h1>List of Courses</h1>
       <ul>
         {courses.map(course =>
           <li key={course.id}>{course.title}</li>
         )}
       </ul> */}

    </div>
  );
}

export default App;









