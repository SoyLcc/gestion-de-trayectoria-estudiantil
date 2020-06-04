import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import StudentHome from './components/student/StudentHome';
import ProfileHome from './components/profile/ProfileHome';
import PollsHome from './components/polls/PollsHome';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact  component={ StudentHome } />
        <Route path="/poll" component={ PollsHome } />
        <Route path="/Profile" component={ ProfileHome } />
      </Router>
    )
  }
}