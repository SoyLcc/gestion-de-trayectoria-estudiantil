import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import StudentPlan from './components/StudentPlan';
import Poll from './components/Poll';
import Profile from './components/Profile';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact  component={ StudentPlan } />
        <Route path="/poll" component={ Poll } />
        <Route path="/Profile" component={ Profile } />
      </Router>
    )
  }
}