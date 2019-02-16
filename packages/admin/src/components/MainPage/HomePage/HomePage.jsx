//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';

// create a component
const HomePage = ({ userInfo, userPricingPlan }) => {
    return (
        <React.Fragment>
            <div className="row" style={{ marginLeft: "-20px", marginRight: "-20px" }}>
                Admin HomePage!
            </div>
        </React.Fragment>
    );
};

HomePage.propTypes = {
};
//make this component available to the app
export default HomePage;
