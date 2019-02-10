//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import wallpaper from '../../../assets/img/homepage.jpg';

// create a component
const HomePage = ({ userInfo, userPricingPlan }) => {
    return (
        <React.Fragment>
            <div className="row" style={{ marginLeft: "-20px", marginRight: "-20px" }}>
                <div className="col-sm-4 fullHeight" style={{ padding: 0 }}>
                    <img src={wallpaper} className="fullHeight" style={{ position: "absolute", zIndex: "-1" }} alt="wallpaper is missing"></img>
                    {userInfo.username && <div style={{ color: "#CACFD2" }}>
                        {/* <p className="independent" style={{ bottom: "5%", fontSize: "28px" }}>{userInfo.username}</p> */}
                        {/* <p className="independent">email - {userInfo.email}</p>
                        <p className="independent">Phone No. - {userInfo.phone_number}</p> */}
                        {userPricingPlan && <div className="independent" style={{ top: "40%", fontSize: "14px" }}>
                            <svg height="80" width="80">
                                <circle cx="40" cy="40" r="30" stroke="white" stroke-width="3" fill="none" />
                            </svg>
                            <p style={{ marginTop: "-49px" }}>{userInfo.cvReviewsTaken} / {userPricingPlan.cvReviewsAllowed}</p>
                            <p style={{ marginTop: "25px" }}>Cv Reviews Taken</p>
                        </div>}
                    </div>}
                </div>
                <div className="col-sm-8 fullHeight" style={{ padding: 0, backgroundColor: "white" }}>
                    <p className="independent" style={{ top: "40%", fontSize: "28px" }}>{userInfo.username}</p>
                    <p className="independent" style={{ top: "45%" }}>{userInfo.email}</p>
                    <p className="independent" style={{ top: "48%" }}>{userInfo.phone_number}</p>
                </div>
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
