import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { Router, Switch, Route, Redirect } from "react-router-dom";
/* Configuring Amplify*/
import { awsConfig } from "awsls";
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
/*Configure redux */
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import history from './history';
/*React components */
import MainPage from './components/MainPage/MainPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'react-notifications/lib/notifications.css';

Amplify.configure(awsConfig);
const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Fragment>
            <Switch>
              <Route exact path="*" render={({ history, location }) => (<MainPage history={history} location={location}></MainPage>)}></Route>
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default withAuthenticator(App);
