//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import wallpaper from '../../../assets/img/homepage.jpg';

// create a component
const HomePage = ({ userInfo, userPricingPlan }) => {
    return (
        <React.Fragment>
            <div className="fullHeight" style={{ padding: 0, backgroundColor: "white", marginLeft: "-20px", marginRight: "-20px" }}>
                <p className="independent" style={{ top: "30%", fontSize: "28px" }}>{userInfo.username}</p>
                <p className="independent" style={{ top: "36%" }}>{userInfo.email}</p>
                <p className="independent" style={{ top: "40%" }}>{userInfo.phone_number}</p>
                {userInfo.username && <div>
                    {userPricingPlan && <div className="independent" style={{ top: "45%", fontSize: "14px" }}>
                        <svg height="80" width="80">
                            <circle cx="40" cy="40" r="30" stroke="black" strokeWidth="3" fill="none" />
                        </svg>
                        <p style={{ marginTop: "-49px" }}>{userInfo.cvReviewsTaken} / {userPricingPlan.cvReviewsAllowed}</p>
                        <p style={{ marginTop: "25px" }}>Cv Reviews Taken</p>
                    </div>}
                </div>}
            </div>
        </React.Fragment>
    );
};

HomePage.propTypes = {
    userInfo: PropTypes.object.isRequired,
    userPricingPlan: PropTypes.object.isRequired
};
//make this component available to the app
export default HomePage;
