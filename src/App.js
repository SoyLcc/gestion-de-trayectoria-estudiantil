import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import StudentHome from './components/student/StudentHome';
import ProfileHome from './components/profile/ProfileHome';
import PollsHome from './components/polls/PollsHome';
import AdminPolls from './components/admin/AdminPolls';
import adminStudents from './components/admin/AdminStudents';
import adminSubjects from './components/admin/AdminSubjects';
import NewPoll from './components/admin/polls/NewPoll';
import NewStudent from './components/admin/students/NewStudent';
import EditStudent from './components/admin/students/EditStudent';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact  component={ StudentHome } />
        <Route path="/poll" component={ PollsHome } />
        <Route path="/Profile" component={ ProfileHome } />

        <Route path="/admin/polls" exact  component={ AdminPolls } />
        <Route path="/admin/newPoll" exact  component={ NewPoll } />
        <Route path="/admin/students" component={ adminStudents } />
        <Route path="/admin/newStudent" component={ NewStudent } />
        <Route path="/admin/editStudent" component={ EditStudent } />
        <Route path="/admin/subjects" component={ adminSubjects } />
      </Router>
    )
  }
}