import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import history from './history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="*" component={LandingPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
