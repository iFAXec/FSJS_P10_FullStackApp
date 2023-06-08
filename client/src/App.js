import React from 'react';
import { Route, Routes } from 'react-router-dom';

//App Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Authenticated from './components/Authenticated';
import PrivateRoute from './components/PrivateRoute';
import SignOutConfirmation from './components/SignOutConfirmation'




const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />
        <Route path='courses/:id' element={<CourseDetail />} />
        <Route path='authenticated' element={<Authenticated />} />
        <Route path='error' element={<UnhandledError />} />
        <Route path='forbidden' element={<Forbidden />} />
        <Route path='*' element={<NotFound />} />
        <Route path='notfound' element={<NotFound />} />
        <Route path='signin' element={<UserSignIn />} />
        <Route path='signup' element={<UserSignUp />} />
        <Route path='signoutconfirmation' element={<SignOutConfirmation />} />

        <Route element={<PrivateRoute />}>
          <Route path='courses/create' element={<CreateCourse />} />
          <Route path='courses/:id/update' element={<UpdateCourse />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;









