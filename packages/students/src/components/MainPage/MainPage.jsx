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
            accessibleAppModules: [],
            expanded: false,
            isInitializing: false,
            selectedModule: 'home'
        };

        this.onModuleSelect = this.onModuleSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.loadPricingPlans = this.loadPricingPlans.bind(this);
        this.loadUserAppModuleAccess = this.loadUserAppModuleAccess.bind(this);
        this.loadUserCvReviews = this.loadUserCvReviews.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.setAccessibleAppModules = this.setAccessibleAppModules.bind(this);
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

    loadPricingPlans() {
        this.props.pricingPlanActions._listPricingPlans();
    }

    loadUserAppModuleAccess() {
        var userInfo = this.props.state.userInfo;
        var group = userInfo.group;
        this.props.appModuleAccessActions._loadAppModuleAccess(group);
    }

    loadUserCvReviews(username) {
        //WORK - cvReview of current user should be loaded
        this.props.cvReviewActions._listCvReviews(username).then(data => {
            this.setInitializing(false);
        }).catch(error => {
            this.setInitializing(false);
        });
    }

    async loadUserData() {
        var username;
        //get current username
        await Auth.currentUserInfo().then(data => {
            username = data.username;
        }).catch(err => {
            NotificationManager.error('Error fetching user data', '', 2000);
        });
        //loading userinfo
        await this.props.userInfoActions._loadUserInfo(username);
        //load appModuleAccess based on userinfo
        this.loadUserAppModuleAccess();
        //loading user's reviews
        this.loadUserCvReviews(username);
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
        else if (selectedModule.indexOf("cvReview") != -1) {
            selectedIcon = 'cvReviews';
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
    }

    shouldComponentUpdate(nextProps, nextState) {
        //preventing re-render of child components on redux state change
        //component update on accessible app modules change
        if (nextProps.state.accessibleAppModules != this.props.accessibleAppModules) {
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
                    <Switch>
                        <Route path="/" exact component={props => <HomePage {...props}></HomePage>} />
                        <Route exact path="/cvReviews" component={props => <CVReviewList {...props}></CVReviewList>} />
                        <Route exact path="/cvReview" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route exact path="/cvReview/:id" component={props => <ManageCVReview {...props}></ManageCVReview>} />
                        <Route path="/settings/*" component={props => <div>settings</div>} />
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
