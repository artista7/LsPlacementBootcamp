//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*React-pdf configuration */
import { Document, Page, pdfjs } from 'react-pdf';
import { CVReviewStatus } from '../../../constants/constants';
import './CVReview.css';
/*Loader */
import Loader from 'react-loader-spinner'
import { Formik, ErrorMessage, Form } from 'formik';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// create a component
const CVReview = ({ cvReview, cvUrl, isS3Uploading, numPages, onDocumentLoad, onSubmit, pageNumber, pickCvForReview, redirectToRoute, selectedFile, shufflePage }) => {
    return (
        <div>
            <div className="row">
                {/* Left panel - Form */}
                <div className="col-sm-12 col-lg-6">
                    <div style={{ textAlign: "center" }}>
                        <Loader
                            type="Rings"
                            color={cvReview.status == CVReviewStatus.draft ? "rgb(204,80,74)" : cvReview.status == CVReviewStatus.submitted ? "#D4AC0D" : cvReview.status == CVReviewStatus.underReview ? "#2980B9" : cvReview.status == CVReviewStatus.complete ? "#196F3D" : "black"}
                            height={40}
                            width={40}
                        />
                    </div>

                    {/* Showing comments text area in review state*/}
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={cvReview}
                            validate={(values) => {
                                let errors = {};
                                if (values.comments == null) {
                                    errors.comments = "Add a comment!";
                                }
                                return errors;
                            }}
                            onSubmit={onSubmit}>
                            {props => {
                                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleReset } = props;
                                return (
                                    <Form>
                                        {(cvReview.status == CVReviewStatus.underReview || cvReview.status == CVReviewStatus.reviewCompleted) &&
                                            <React.Fragment>
                                                <p>Review CV:</p>
                                                <textarea
                                                    name="comments"
                                                    onChange={handleChange}
                                                    value={values.comments != null ? values.comments : ""}
                                                    rows="4"
                                                    cols="50"
                                                    style={{ width: "100%" }}>
                                                </textarea>
                                                <ErrorMessage name="comments">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                            </React.Fragment>
                                        }
                                        {/* <div id="debug">
                                            {JSON.stringify(values)}
                                        </div> */}
                                        {<div className="mt-3" style={{ textAlign: "center" }}>
                                            {(cvReview.status == CVReviewStatus.underReview || cvReview.status == CVReviewStatus.reviewCompleted) && <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>}
                                            {cvReview.status == CVReviewStatus.submitted && <button className="btn btn-primary" onClick={pickCvForReview}>Pick for Review</button>}
                                            <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => redirectToRoute('/cvReviews')}>Back</button>
                                        </div>}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>

                </div>
                {/* Right panel - CV View */}
                <div className="col-sm-12 col-lg-6" style={{ borderLeft: "1px #e6e6e6 solid", overflowY: "scroll", height: "calc(100vh - 60px)" }}>
                    <div id='pagePicker'>
                        {numPages > 1 && <p style={{ textAlign: "center" }}>
                            <i className="fa fa-angle-left link-button fa-in-circle" style={{ marginRight: "5px" }} onClick={() => shufflePage(0)}></i>
                            Page {pageNumber} of {numPages}
                            <i className="fa fa-angle-right link-button fa-in-circle" style={{ marginLeft: "5px" }} onClick={() => shufflePage(1)}></i>
                        </p>}
                    </div>
                    <div style={{ border: '1px solid #e6e6e6', marginBottom: "15px" }}>
                        <div className="pageCenter">
                            {isS3Uploading && <Loader
                                type="Triangle"
                                color="rgb(204,80,74)"
                            />}
                        </div>
                        <Document
                            file={cvUrl || selectedFile}
                            onLoadSuccess={onDocumentLoad}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    );
};

CVReview.propTypes = {
    cvReview: PropTypes.object.isRequired,
    isS3Uploading: PropTypes.bool.isRequired,
    numPages: PropTypes.number,
    onDocumentLoad: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    pageNumber: PropTypes.number,
    pickCvForReview: PropTypes.func.isRequired,
    redirectToRoute: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
    shufflePage: PropTypes.func.isRequired,
    cvUrl: PropTypes.string.isRequired
};
//make this component available to the app
export default CVReview;
