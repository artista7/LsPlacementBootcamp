//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// create a component
const CVReviewTable = ({ cvReviewList }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
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
    );
};

CVReviewTable.propTypes = {
    cvReviewList: PropTypes.array.isRequired
};
//make this component available to the app
export default CVReviewTable;
