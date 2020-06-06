import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import StudentHome from './components/student/StudentHome';
import ProfileHome from './components/profile/ProfileHome';
import PollsHome from './components/polls/PollsHome';
import adminPolls from './components/admin/adminPolls';
import adminStudents from './components/admin/adminStudents';
import adminSubjects from './components/admin/adminSubjects';
import newPoll from './components/admin/polls/newPoll';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact  component={ StudentHome } />
        <Route path="/poll" component={ PollsHome } />
        <Route path="/Profile" component={ ProfileHome } />

        <Route path="/admin/polls" exact  component={ adminPolls } />
        <Route path="/admin/newPoll" exact  component={ newPoll } />
        <Route path="/admin/students" component={ adminStudents } />
        <Route path="/admin/subjects" component={ adminSubjects } />
      </Router>
    )
  }
}