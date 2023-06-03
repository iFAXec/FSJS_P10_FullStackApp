import React from 'react';
import { Route, Routes } from 'react-router-dom';

//App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Error from './components/Error';
import Forbidden from './components/Forbidden';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='courses/create' element={<CreateCourse />} />
        <Route path='courses/:id/update' element={<UpdateCourse />} />
        <Route path='courses/:id' element={<CourseDetail />} />
        <Route path='error' element={<Error />} />
        <Route path='forbidden' element={<Forbidden />} />
        <Route path='*' element={<NotFound />} />
        <Route path='signin' element={<UserSignIn />} />
        <Route path='signup' element={<UserSignUp />} />
        <Route path='/' element={<UserSignOut />} /> {/* //FIXME - complete the signout components */}
      </Routes>
    </div>
  );
}

export default App;









