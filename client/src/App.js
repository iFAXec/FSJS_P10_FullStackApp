import React, { useState, useEffect } from 'react';


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
      <h1>List of Courses</h1>
      <ul>
        {courses.map(course =>
          <li key={course.id}>{course.title}</li>
        )}
      </ul>

    </div>
  );
}

export default App;









