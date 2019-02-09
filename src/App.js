import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/Auth/Login';
import HomePage from './components/HomePage/HomePage';
import history from './history';
/* Configuring Amplify*/
import aws_config from "./aws-exports";
import Amplify from 'aws-amplify';
/*Configure redux */
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
/*Styles */
import 'react-circular-progressbar/dist/styles.css';
import 'react-notifications/lib/notifications.css';

Amplify.configure(aws_config);

const store = configureStore()

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      stateVariable: false
    }

    this.updateStateVariable = this.updateStateVariable.bind(this);
  }

  updateStateVariable() {
    this.setState({
      stateVariable: !this.state.stateVariable
    })
  }

  render() {
    var authState = localStorage.getItem("amplify-authenticator-authState");
    return (
      <Provider store={store}>
        <Router history={history}>
          <React.Fragment>
            {authState != "signedIn" && <Switch>
              <Route exact path="/" component={LandingPage}></Route>
              <Route exact path="/login" render={() => (<LoginPage updateStateVariable={this.updateStateVariable}></LoginPage>)}></Route>
              <Route path="*" render={() => (<Redirect to={{ pathname: "/" }}></Redirect>)}></Route>
            </Switch>}
            {authState == "signedIn" && <Switch>
              <Route exact path="*" render={({ history, location }) => (<HomePage history={history} location={location} updateStateVariable={this.updateStateVariable}></HomePage>)}></Route>
            </Switch>}
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
