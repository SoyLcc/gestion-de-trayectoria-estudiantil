import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Navigation from './components/Navigation';
import StudentHome from './components/student/StudentHome';
import ProfileHome from './components/profile/ProfileHome';
import PollsHome from './components/polls/PollsHome';
import AdminPolls from './components/admin/AdminPolls';
import AdminStudents from './components/admin/AdminStudents';
import AdminSubjects from './components/admin/AdminSubjects';
import NewPoll from './components/admin/polls/Newpoll';
import NewStudent from './components/admin/students/NewStudent';
import EditStudent from './components/admin/students/EditStudent';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Logout from './components/auth/logout';
import Poll from './components/polls/Poll';
import PollResults from './components/polls/PollResults';

export default function App() {
    const { isAuth } = useContext(AuthContext);
    const navbar = isAuth ? <Navigation /> : null;

    return (
      <Router>
        {navbar}
        <Route path="/login" component= { Login }  />
        <Route path="/logout" component={ Logout } />
        
        <ProtectedRoute path="/" exact component={ StudentHome } />
        <ProtectedRoute path="/poll" component={ PollsHome } />
        <ProtectedRoute path="/Profile" component={ ProfileHome } />

        <ProtectedRoute path="/polls/:id" exact component={ Poll } />
        <ProtectedRoute path="/polls/:id/results" exact component={ PollResults } />

        <AdminProtectedRoute path="/admin/polls" exact  component={ AdminPolls } />
        <AdminProtectedRoute path="/admin/newPoll" exact  component={ NewPoll } />
        <AdminProtectedRoute path="/admin/students" component={ AdminStudents } />
        <AdminProtectedRoute path="/admin/newStudent" component={ NewStudent } />
        <AdminProtectedRoute path="/admin/editStudent" component={ EditStudent } />
        <AdminProtectedRoute path="/admin/subjects" component={ AdminSubjects } />
      </Router>
    )
}
export const API_URL = process.env.REACT_APP_API_URL;