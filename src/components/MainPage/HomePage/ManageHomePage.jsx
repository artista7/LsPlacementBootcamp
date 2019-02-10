//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from './HomePage';

// create a component
class ManageHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <React.Fragment>
                <HomePage userInfo={this.props.userInfo} userPricingPlan={this.props.userPricingPlan}></HomePage>
            </React.Fragment>
        );
    }
}

function getUserPricingPlan(pricingPlans, pricingPlanId) {
    const userPricingPlan = pricingPlans.filter(pricingPlan => pricingPlan.id == pricingPlanId);
    if (userPricingPlan) { return userPricingPlan[0]; }
    return null;
}

function mapStateToProps(state, ownProps) {
    let userInfo = state.userInfo;
    let userPricingPlan = getUserPricingPlan(state.pricingPlans, userInfo.pricingPlanId);
    return {
        userInfo: userInfo,
        userPricingPlan: userPricingPlan
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}
ManageHomePage.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageHomePage);
