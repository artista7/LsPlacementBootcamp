import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import ToDoPage from './components/ToDo/ToDo';
import history from './history';
/* Configuring Amplify*/
import aws_config from "./aws-exports";
import Amplify from 'aws-amplify';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';

Amplify.configure(aws_config);

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/todo" component={ToDoPage} />
            <Route path="*" component={LandingPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
