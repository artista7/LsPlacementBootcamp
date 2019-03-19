//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActions from '../../actions/userInfoActions';
import * as cvReviewActions from '../../actions/cvReviewActions';
import * as pricingPlanActions from '../../actions/pricingPlanActions';
import * as appModuleAccessActions from '../../actions/appModuleAccessActions';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { Switch, Route, Redirect } from "react-router-dom";
/*styled components */
import styled from 'styled-components';
import Sidebar from '../Common/Sidebar/Sidebar';
import Breadcrumbs from '../Common/Breadcrumbs';
import { NotificationManager } from 'react-notifications';
import Loader from 'react-loader-spinner';
import * as constants from '../../constants/constants';
/*Child components */
import HomePage from './HomePage/ManageHomePage';
import ManageCvReviewList from './CVReview/ManageCVReviewList';
import ManageCVReview from './CVReview/ManageCVReview';
//Subscription related
import { API, graphqlOperation } from 'aws-amplify';
import { subscriptions } from 'awsls';

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
            accessibleAppModules: [],
            createCvReviewSubscription: null,
            expanded: false,
            isInitializing: false,
            selectedModule: 'home',
            updateCvReviewSubscription: null
        };

        this.onModuleSelect = this.onModuleSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.loadPricingPlans = this.loadPricingPlans.bind(this);
        this.loadUserAppModuleAccess = this.loadUserAppModuleAccess.bind(this);
        this.loadCvReviews = this.loadCvReviews.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.onCreateCvReviewSubscription = this.onCreateCvReviewSubscription.bind(this);
        this.onUpdateCvReviewSubscription = this.onUpdateCvReviewSubscription.bind(this);
        this.setAccessibleAppModules = this.setAccessibleAppModules.bind(this);
        this.setInitializing = this.setInitializing.bind(this);
        this.setSelectedModule = this.setSelectedModule.bind(this);
        this.signOut = this.signOut.bind(this);
        this.unsubscribeOnCreateCvReview = this.unsubscribeOnCreateCvReview.bind(this);
        this.unsubscribeOnUpdateCvReview = this.unsubscribeOnUpdateCvReview.bind(this);
    }

    onModuleSelect(selected) {
        //sign out on clicking on it
        if (selected == constants.SIGN_OUT) {
            this.signOut();
        }
        //else if clicked icon is different, redirect to intended route
        const to = '/' + selected;
        if (this.props.location.pathname !== to) {
            this.props.history.push(to);
        }
    }

    onToggle(expanded) {
        this.setState({ expanded: expanded });
    };

    loadPricingPlans() {
        this.props.pricingPlanActions._listPricingPlans();
    }

    loadUserAppModuleAccess() {
        var group = this.props.state.userInfo.group;
        this.props.appModuleAccessActions._loadAppModuleAccess(group);
    }

    loadCvReviews(username) {
        var group = this.props.state.userInfo.group;
        //WORK - cvReview of current user should be loaded
        this.props.cvReviewActions._listCvReviews(group, username).then(data => {
            this.setInitializing(false);
        }).catch(error => {
            this.setInitializing(false);
        });
    }

    async loadUserData() {
        var username;
        //1. get current username
        await Auth.currentUserInfo().then(data => {
            username = data.username;
        }).catch(err => {
            NotificationManager.error('Error fetching user data', '', 2000);
        });
        //2. loading userinfo
        await this.props.userInfoActions._loadUserInfo(username);
        //3. load appModuleAccess based on userinfo
        this.loadUserAppModuleAccess();
        //4. loading cv reviews based on user group
        this.loadCvReviews(username);
        //5. Start cvreview subscriptions
        this.onCreateCvReviewSubscription(this.props.state.userInfo.group, username);
        this.onUpdateCvReviewSubscription(this.props.state.userInfo.group, username);
    }

    onCreateCvReviewSubscription(group, username) {
        console.log('starting onCreateCvReviewSubscription');
        var that = this;
        this.state.createCvReviewSubscription = API.graphql(
            graphqlOperation(subscriptions.onCreateCvReview)
        ).subscribe({
            next: (data) => {
                if (group == constants.groups.ADMIN || username == data.value.data.onCreateCvReview.createdBy) {
                    var cvReview = data.value.data.onCreateCvReview;
                    that.props.cvReviewActions._createCvReviewSuccess(cvReview);
                }
                else {
                    console.log("cvreview not meant for you", data.value.data.onCreateCvReview);
                }
            },
            error: err => {
                console.log('error in onCreateCvReviewSubscription', err);
                this.state.createCvReviewSubscription.unsubscribe(); //just for safe side
                that.onCreateCvReviewSubscription(that.props.state.userInfo.group, that.props.state.userInfo.username);
            }
        });
    }

    onUpdateCvReviewSubscription(group, username) {
        var that = this;
        console.log('starting onUpdateCvReviewSubscription');
        this.state.updateCvReviewSubscription = API.graphql(
            graphqlOperation(subscriptions.onUpdateCvReview)
        ).subscribe({
            next: (data) => {
                if (group == constants.groups.ADMIN || username == data.value.data.onUpdateCvReview.createdBy) {
                    var cvReview = data.value.data.onUpdateCvReview;
                    that.props.cvReviewActions._updateCvReviewSuccess(cvReview);
                }
                else {
                    debugger;
                    console.log("cvreview not meant for you", data.value.data.onCreateCvReview);
                }
            },
            error: err => {
                console.log('error in onUpdateCvReviewSubscription', err);
                this.state.updateCvReviewSubscription.unsubscribe(); //just for safe side
                that.onUpdateCvReviewSubscription(that.props.state.userInfo.group, that.props.state.userInfo.username);
            }
        });
    }

    setAccessibleAppModules(accessibleAppModules) {
        this.setState({
            accessibleAppModules: accessibleAppModules
        })
    }

    setInitializing(bool) {
        this.setState({
            isInitializing: bool == true ? true : false
        })
    }

    setSelectedModule(selectedModule) {
        var selectedIcon = "";
        if (selectedModule == "" || selectedModule == "/") {
            selectedIcon = 'home';
        }
        else if (selectedModule.toLowerCase().indexOf("cvreview") != -1) {
            selectedIcon = 'cvreviews';
        }
        else {
            selectedIcon = selectedModule.substring(1);
        }
        this.setState({
            selectedModule: selectedIcon
        });
    }

    signOut() {
        Auth.signOut().then(data => {
        }).catch(err => {
            console.log(err);
        });
    }

    unsubscribeOnCreateCvReview() {
        if (this.state.createCvReviewSubscription != null) {
            console.log('ending create cvReview subscription');
            this.state.createCvReviewSubscription.unsubscribe();
        }
    }

    unsubscribeOnUpdateCvReview() {
        if (this.state.updateCvReviewSubscription != null) {
            console.log('ending update cvReview subscription');
            this.state.updateCvReviewSubscription.unsubscribe();
        }
    }

    componentWillMount() {
        //adding current loggedin user data to redux state, this take time - some operations requiring user data might get affected
        this.setInitializing(true);
        this.loadPricingPlans();
        this.loadUserData();
    }

    componentDidMount() {
        //get selected icon from route on component mount
        var selectedModule = this.props.history.location.pathname;
        this.setSelectedModule(selectedModule);
    }

    componentDidUpdate(prevProps, prevState) {
        //when accessibleAppModules are available
        if (prevProps.state.accessibleAppModules != this.props.state.accessibleAppModules) {
            this.setAccessibleAppModules(this.props.state.accessibleAppModules);
        }
        //if current path is different from previous, update selected icon
        if (prevProps.location.pathname != this.props.location.pathname) {
            var selectedModule = this.props.history.location.pathname;
            this.setSelectedModule(selectedModule);
        };
    }

    componentWillUnmount() {
        this.props.updateStateVariable();
        this.unsubscribeOnCreateCvReview();
        this.unsubscribeOnUpdateCvReview();
    }

    shouldComponentUpdate(nextProps, nextState) {
        //preventing re-render of child components on redux state change
        //component update on accessible app modules change
        if (nextProps.state.accessibleAppModules != this.props.state.accessibleAppModules) {
            return true;
        }
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
        const { expanded, selectedModule } = this.state;
        return (
            <div>
                {/* <div>{JSON.stringify(this.state)}</div> */}
                {this.state.isInitializing && <div className="pageCenter"><Loader
                    type="Triangle"
                    color="rgb(204,80,74)"
                /></div>}
                <Sidebar accessibleAppModules={this.state.accessibleAppModules} onModuleSelect={this.onModuleSelect} onToggle={this.onToggle} selectedModule={selectedModule}></Sidebar>
                <Main expanded={expanded} style={{ height: "100vh", overflowY: "scroll" }}>
                    {/* Routing for students */}
                    {this.props.state.userInfo.group == constants.groups.STUDENT && <Switch>
                        <Route path="/" exact component={props => <HomePage {...props}></HomePage>} />
                        <Route exact path="/cvreviews" component={props => <ManageCvReviewList {...props}></ManageCvReviewList>} />
                        <Route exact path="/cvreview" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route exact path="/cvreview/:id" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route path="*" render={() => (<Redirect to={{ pathname: "/" }}></Redirect>)}></Route>
                    </Switch>}
                    {/* Routing for admins */}
                    {this.props.state.userInfo.group == constants.groups.ADMIN && <Switch>
                        <Route exact path="/cvreviews" component={props => <ManageCvReviewList {...props}></ManageCvReviewList>} />
                        <Route exact path="/cvreview" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route exact path="/cvreview/:id" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route path="/settings" component={props => <div>settings</div>} />
                        <Route path="*" render={() => (<Redirect to={{ pathname: "/cvreviews" }}></Redirect>)}></Route>
                    </Switch>}
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
        appModuleAccessActions: bindActionCreators(appModuleAccessActions, dispatch),
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch),
        pricingPlanActions: bindActionCreators(pricingPlanActions, dispatch),
        userInfoActions: bindActionCreators(userInfoActions, dispatch),
    };
}

MainPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    updateStateVariable: PropTypes.func.isRequired
};

//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(MainPage));
