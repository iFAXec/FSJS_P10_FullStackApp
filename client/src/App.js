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
import Authenticated from './components/Authenticated';
import PrivateRoute from './components/PrivateRoute';
import SignOutConfirmation from './components/SignOutConfirmation';


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Courses />} />

        <Route element={<PrivateRoute />}>
          <Route path='courses/create' element={<CreateCourse />} />
          <Route path='courses/:id/update' element={<UpdateCourse />} />
        </Route>

        <Route path='courses/:id' element={<CourseDetail />} />
        <Route path='authenticated' element={<Authenticated />} />
        <Route path='signoutconfirmation' element={<SignOutConfirmation />} />
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









