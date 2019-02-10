//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// create a component
const CVReviewTable = ({ cvReviewList }) => {
    return (
        <React.Fragment>
            <table className="table table-hover myCard hCenter" style={{ marginTop: "25px", width: "95%" }}>
                <thead>
                    <tr>
                        <th>Link</th>
                        <th>Status</th>
                        {/* <th>Created By</th> */}
                        {/* <th>Created At</th> */}
                    </tr>
                </thead>
                <tbody>
                    {cvReviewList.map(cvReview => {
                        return (
                            <tr key={cvReview.id}>
                                <td><Link to={'/cvReview/' + cvReview.id}>View</Link></td>
                                <td>{cvReview.status}</td>
                                {/* <td>{cvReview.createdBy}</td> */}
                                {/* <td>{new Date(cvReview.createdAt).toLocaleString()}</td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h6 className="hCenter">Submitted Reviews</h6>
        </React.Fragment>
    );
};

CVReviewTable.propTypes = {
    cvReviewList: PropTypes.array.isRequired
};
//make this component available to the app
export default CVReviewTable;
