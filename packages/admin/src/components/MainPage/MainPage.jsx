//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvReviewActions from '../../actions/cvReviewActions';
import * as userInfoActions from '../../actions/userInfoActions';
import { Auth } from 'aws-amplify';
import { Switch, Route, Redirect } from "react-router-dom";
/*styled components */
import styled from 'styled-components';
import Sidebar from '../Common/Sidebar/Sidebar';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from 'react-loader-spinner';
import * as constants from '../../constants/constants';
/*Child components */
import HomePage from './HomePage/ManageHomePage';
import CVReviewList from './CVReview/CVReviewList';
import ManageCVReview from './CVReview/ManageCVReview';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

// create a component
class MainPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            isInitializing: false,
            pageTitle: {
                'home': 'Home',
                'cvReviews': 'CV Review(s)',
                // 'devices': ['Devices'],
                // 'reports': ['Reports'],
                // 'settings/policies': ['Settings', 'Policies'],
                // 'settings/network': ['Settings', 'Network']
            },
            selectedModule: 'home'
        };

        this.onModuleSelect = this.onModuleSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.loadCvReviews = this.loadCvReviews.bind(this);
        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.setInitializing = this.setInitializing.bind(this);
        this.setSelectedModule = this.setSelectedModule.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    onModuleSelect(selected) {
        //sign out on clicking on it
        if (selected == constants.SIGN_OUT) {
            this.signOut();
        }
        //else if clicked icon is different, change selected icon and redirect to intended route
        const to = '/' + selected;
        if (this.props.location.pathname !== to) {
            this.props.history.push(to);
        }
    }

    onToggle(expanded) {
        this.setState({ expanded: expanded });
    };

    loadCvReviews() {
        this.setInitializing(true);
        this.props.cvReviewActions._listCvReviews().then(data => {
            this.setInitializing(false);
        }).catch(error => {
            this.setInitializing(false);
        });
    }

    loadUserInfo() {
        //get current username
        Auth.currentUserInfo().then(data => {
            let username = data.username;
            //loading userinfo
            this.props.userInfoActions._loadUserInfo(username);
        }).catch(err => {
            NotificationManager.error('Error fetching user data', '', 2000);
        });
    }

    setInitializing(bool) {
        this.setState({
            isInitializing: bool == true ? true : false
        })
    }

    setSelectedModule(selectedModule) {
        if (selectedModule == "" || selectedModule == "/") {
            selectedModule = 'home';
        }
        else if (selectedModule.indexOf("cvReview") != -1) {
            selectedModule = 'cvReviews';
        }
        else {
            selectedModule = selectedModule.substring(1);
        }
        this.setState({
            selectedModule: selectedModule
        });
    }

    signOut() {
        Auth.signOut().then(data => {
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        //adding current loggedin user data to redux state, this take time - some operations requiring user data might get affected
        this.loadUserInfo();
    }

    componentDidMount() {
        //get selected icon from route on component mount
        var selectedModule = this.props.history.location.pathname;
        this.setSelectedModule(selectedModule);
        //fetch cv reviews
        this.loadCvReviews();
    }

    componentDidUpdate(prevProps, prevState) {
        //if current path is different from previous, update selected icon
        if (prevProps.location.pathname != this.props.location.pathname) {
            var selectedModule = this.props.history.location.pathname;
            this.setSelectedModule(selectedModule);
        };
    }

    componentWillUnmount() {
        //this.props.updateStateVariable();
    }

    shouldComponentUpdate(nextProps, nextState) {
        //preventing re-render of child components on redux state change
        //component update on state changed
        if (JSON.stringify(this.state) != JSON.stringify(nextState)) {
            return true;
        }
        //component update on router path change
        if (this.props.location.pathname != nextProps.history.location.pathname) {
            return true;
        }
        return false;
    }

    render() {
        const { expanded, pageTitle, selectedModule } = this.state;
        return (
            <div>
                <NotificationContainer />
                {this.state.isInitializing && <div className="pageCenter"><Loader
                    type="Triangle"
                    color="rgb(204,80,74)"
                /></div>}
                <Sidebar onModuleSelect={this.onModuleSelect} onToggle={this.onToggle} selectedModule={selectedModule}></Sidebar>
                <Main expanded={expanded} style={{ height: "100vh", overflowY: "scroll" }}>
                    <Switch>
                        <Route path="/" exact component={props => <HomePage {...props}></HomePage>} />
                        <Route exact path="/cvReviews" component={props => <CVReviewList {...props}></CVReviewList>} />
                        <Route exact path="/cvReview/:id" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        {/* <Route exact path="/cvReview" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route path="/settings/*" component={props => <div>settings</div>} /> */}
                        <Route path="*" render={() => (<Redirect to={{ pathname: "/" }}></Redirect>)}></Route>
                    </Switch>
                </Main>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch),
        userInfoActions: bindActionCreators(userInfoActions, dispatch),
    };
}

MainPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
