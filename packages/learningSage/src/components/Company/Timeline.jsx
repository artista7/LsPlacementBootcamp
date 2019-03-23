//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Timeline.css';

// create a component
const InternTimeline = () => {
    return (
        <React.Fragment>
            <header className="example-header">
                <h1 className="text-center">Learn-Earn-Intern</h1>
                {/* <p>Real-life projects aimed to <span style={{ color: "#F05F40" }}>teach you</span></p> */}
                <p>A <span style={{ color: "#F05F40" }}>Learning-sage</span> Initiative</p>
                <a className="btn btn-primary btn-xl js-scroll-trigger" href='https://goo.gl/forms/U4HvG1OdFdohPa1d2' target="_blank_">Apply</a>
            </header>
            <div className="container-fluid">
                <div className="row example-centered">
                    <div className="col-xs-12 col-xs-offset-1 col-sm-12 col-sm-offset-2" style={{ marginTop: "60px" }}>
                        <h2 className="text-center timeline-title" style={{ marginBottom: "30px" }}><u>Timeline</u></h2>
                        <ul className="timeline timeline-centered">
                            <li className="timeline-item">
                                <div className="timeline-info">
                                    <span>April, 2019</span>
                                </div>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Screening</h3>
                                    <p>Criteria - Passion to learn</p>
                                </div>
                            </li>
                            <li className="timeline-item">
                                <div className="timeline-info">
                                    <span>May-July, 2019</span>
                                </div>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Summer Internship</h3>
                                    <p style={{ maxWidth: "300px", display: "inline-block" }}>Projects on frontend development, Full Stack Development, NLP, AWS & AR</p>
                                </div>
                            </li>
                            <li className="timeline-item period">
                                <div className="timeline-info"></div>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3 className="timeline-title">After Internship</h3>
                                </div>
                            </li>
                            <li className="timeline-item">
                                <div className="timeline-info">
                                    <span>Aug-Nov, 2019</span>
                                </div>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Career Guidance</h3>
                                    <p style={{ maxWidth: "300px", display: "inline-block" }}>Guidance in cv preparation,company shortlisting,interview preparation for 3rd year placements from college</p>
                                </div>
                            </li>
                            <li className="timeline-item">
                                <div className="timeline-info">
                                    <span>Dec, 2019</span>
                                </div>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Winter Intern</h3>
                                    <p>Chance for winter intern with us</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="example-centered example-header">
                <h1 className="text-center">Projects</h1>
                <div>
                    <div id="formContent" style={{ display: "inline-block", color: "black", marginBottom: "25px", maxWidth: "600px" }}>
                        <p style={{ paddingLeft: "40px" }}>
                            NLP document parser
                    </p>

                        <div id="formFooter" style={{ textAlign: "left" }}>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Aim</span> - Develop a document parser to be integrated in live application</div>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Tech</span> - python, xgboost, Neural Networks, RNN, NLTK</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="formContent" style={{ display: "inline-block", color: "black", marginBottom: "25px", maxWidth: "600px" }}>
                        <p style={{ paddingLeft: "40px" }}>
                            Front-end App Development
                    </p>

                        <div id="formFooter" style={{ textAlign: "left" }}>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Aim</span> - To develop & design front-end components for best user experience</div>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Tech</span> - bootstrap, react-redux</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div id="formContent" style={{ display: "inline-block", color: "black", marginBottom: "25px", maxWidth: "600px" }}>
                        <p style={{ paddingLeft: "40px" }}>
                            Backend/Fullstack Development
                    </p>

                        <div id="formFooter" style={{ textAlign: "left" }}>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Aim</span> - To build, develop & deploy scalable & robust backend</div>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Tech</span> - Amazon Web Services (AWS)</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div id="formContent" style={{ display: "inline-block", color: "black", marginBottom: "25px", maxWidth: "600px" }}>
                        <p style={{ paddingLeft: "40px" }}>
                            Research projects
                    </p>

                        <div id="formFooter" style={{ textAlign: "left" }}>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Aim</span> - To research and develop product using Augmented Reality</div>
                            <div><span style={{ color: "black", fontWeight: 'bold' }}>Tech</span> - Amazon Sumerian</div>
                        </div>
                    </div>
                </div>
                {/* <p>A <span style={{ color: "#F05F40" }}>Learning-sage</span> Initiative</p> */}
            </div>

            {/* <div style={{ paddingTop: "60px", textAlign: "center" }}>
                <h3 className="text-center">We invest in you</h3>
                <div id="formContent" style={{ display: "inline-block", color: "black", marginBottom: "25px", maxWidth: "800px" }}>
                    <p style={{ paddingLeft: "40px" }}>What we get in return</p>
                    <p>0 upfront + 9% of 3rd year internship</p>

                    <div id="formFooter" style={{ textAlign: "left" }}>
                        <ul>
                            <li>Pay us if and only if you land 3rd year internship with our help</li>
                            <li>This is an oppurtunity we wished we had</li>
                        </ul>
                    </div>
                </div>
                <p>A <span style={{ color: "#F05F40" }}>Learning-sage</span> Initiative</p>
            </div> */}
        </React.Fragment>
    );
};

InternTimeline.propTypes = {
};
//make this component available to the app
export default InternTimeline;
