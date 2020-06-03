import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navigation from './components/Navigation';
import StudentHome from './components/student';
import Poll from './components/Poll';
import Profile from './components/Profile';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Route path="/" exact  component={ StudentHome } />
        <Route path="/poll" component={ Poll } />
        <Route path="/Profile" component={ Profile } />
      </Router>
    )
  }
}