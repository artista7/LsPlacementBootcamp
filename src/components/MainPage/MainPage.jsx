//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfoActions from '../../actions/userInfoActions';
import * as cvReviewActions from '../../actions/cvReviewActions';
import * as pricingPlanActions from '../../actions/pricingPlanActions';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { Switch, Route, Redirect } from "react-router-dom";
/*styled components */
import styled from 'styled-components';
import Sidebar from '../Common/Sidebar/Sidebar';
import Breadcrumbs from '../Common/Breadcrumbs';
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
                'devices': ['Devices'],
                'reports': ['Reports'],
                // 'settings/policies': ['Settings', 'Policies'],
                // 'settings/network': ['Settings', 'Network']
            },
            selected: 'home'
        };

        this.onSelect = this.onSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.loadPricingPlans = this.loadPricingPlans.bind(this);
        this.loadUserCvReviews = this.loadUserCvReviews.bind(this);
        this.loadUserInfo = this.loadUserInfo.bind(this);
        this.setInitializing = this.setInitializing.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    onSelect(selected) {
        //sign out on clicking on it
        if (selected == constants.SIGN_OUT) {
            this.signOut();
        }
        //else if clicked icon is different, change selected icon and redirect to intended route
        const to = '/' + selected;
        if (this.props.location.pathname !== to) {
            this.setSelected(selected);
            this.props.history.push(to);
        }
    }

    onToggle(expanded) {
        this.setState({ expanded: expanded });
    };

    loadPricingPlans() {
        this.props.pricingPlanActions._listPricingPlans();
    }

    loadUserCvReviews(username) {
        //WORK - cvReview of current user should be loaded
        this.props.cvReviewActions._listCvReviews(username).then(data => {
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
            //loading user's reviews
            this.loadUserCvReviews(username);
        }).catch(err => {
            NotificationManager.error('Error fetching user data', 'Error!', 2000);
        });
    }

    setInitializing(bool) {
        this.setState({
            isInitializing: bool == true ? true : false
        })
    }

    setSelected(selected) {
        this.setState({
            selected: selected
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
        this.loadUserInfo();
    }

    componentDidMount() {
        //get selected icon from route on component mount
        var selected = this.props.history.location.pathname;
        if (selected == "" || selected == "/") {
            this.setSelected('home');
        }
        else if (selected.indexOf("cvReview") != -1) {
            this.setSelected('cvReviews');
        }
        else {
            this.setSelected(selected.substring(1));
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //if current path is different from previous, update selected icon
        if (prevProps.location.pathname != this.props.location.pathname) {
            var selected = this.props.history.location.pathname;
            if (selected == "" || selected == "/") {
                this.setSelected('home');
            }
            else {
                this.setSelected(selected.substring(1));
            }
        };
    }

    componentWillUnmount() {
        this.props.updateStateVariable();
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
        const { expanded, pageTitle, selected } = this.state;
        return (
            <div>
                <NotificationContainer />
                {this.state.isInitializing && <div className="pageCenter"><Loader
                    type="Triangle"
                    color="rgb(204,80,74)"
                /></div>}
                <Sidebar onSelect={this.onSelect} onToggle={this.onToggle} selected={selected}></Sidebar>
                <Main expanded={expanded} style={{ height: "100vh", overflowY: "scroll" }}>
                    {selected != "home" && <Breadcrumbs pageTitle={pageTitle} selected={selected}></Breadcrumbs>}
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
        userInfoActions: bindActionCreators(userInfoActions, dispatch),
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch),
        pricingPlanActions: bindActionCreators(pricingPlanActions, dispatch)
    };
}

MainPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    updateStateVariable: PropTypes.func.isRequired
};

//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(MainPage));
