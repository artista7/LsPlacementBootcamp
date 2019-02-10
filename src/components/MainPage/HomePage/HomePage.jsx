//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// create a component
class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {this.props.userInfo.username && <React.Fragment>
                    <p>Username - {this.props.userInfo.username}</p>
                    <p>email - {this.props.userInfo.email}</p>
                    <p>Phone No. - {this.props.userInfo.phone_number}</p>
                    <p>Cv Reviews taken - {this.props.userInfo.cvReviewsTaken}</p>
                    {this.props.userPricingPlan && <p>Cv Reviews allowed - {this.props.userPricingPlan.cvReviewsAllowed}</p>}
                </React.Fragment>}
            </div>
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
HomePage.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
