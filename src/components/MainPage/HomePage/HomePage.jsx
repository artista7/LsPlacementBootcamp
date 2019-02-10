//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// create a component
const HomePage = ({ userInfo, userPricingPlan }) => {
    return (
        <div>
            {userInfo.username && <React.Fragment>
                <p>Username - {userInfo.username}</p>
                <p>email - {userInfo.email}</p>
                <p>Phone No. - {userInfo.phone_number}</p>
                <p>Cv Reviews taken - {userInfo.cvReviewsTaken}</p>
                {userPricingPlan && <p>Cv Reviews allowed - {userPricingPlan.cvReviewsAllowed}</p>}
            </React.Fragment>}
        </div>
    );
};

HomePage.propTypes = {
    userInfo: PropTypes.object.isRequired,
    userPricingPlan: PropTypes.object.isRequired
};
//make this component available to the app
export default HomePage;
