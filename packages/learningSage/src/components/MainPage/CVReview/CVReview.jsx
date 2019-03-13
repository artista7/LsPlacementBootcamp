//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*React-pdf configuration */
import { Document, Page, pdfjs } from 'react-pdf';
import { CVReviewStatus } from '../../../constants/constants';
import './CVReview.css';
import * as constants from '../../../constants/constants';
/*Loader */
import Loader from 'react-loader-spinner';
import { Formik, ErrorMessage, Form } from 'formik';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// create a component
const CVReview = ({ cvReview, cvUrl, group, handleFileUpload, isS3Uploading, numPages, onCommentsSubmit, onDocumentLoad, onSubmit, pageNumber, pickCvForReview, redirectToRoute, selectedFile, shufflePage }) => {
    return (
        <div>
            <div className="row">
                {/* Left panel - Form */}
                <div className="col-sm-12 col-lg-6">
                    {/* Status */}
                    <div style={{ textAlign: "right" }}>
                        <div style={{ display: "inline-block", textAlign: "center" }}>
                            <p style={{ margin: 0, fontWeight: 500, fontSize: "14px" }}>Status</p>
                            <p style={{ margin: 0, fontSize: "12px" }}>{cvReview.status}</p>
                        </div>
                        {/* <div style={{ display: "inline-block" }}>
                            <Loader
                                type="Rings"
                                color={cvReview.status == CVReviewStatus.draft ? "rgb(204,80,74)" : cvReview.status == CVReviewStatus.submitted ? "#D4AC0D" : cvReview.status == CVReviewStatus.underReview ? "#2980B9" : cvReview.status == CVReviewStatus.complete ? "#196F3D" : "black"}
                                height={40}
                                width={40}
                            />
                        </div> */}

                    </div>
                    {/* Showing cv upload form in draft state only */}
                    {cvReview.status == CVReviewStatus.draft && <div>
                        <p>Upload CV:</p>
                        <Formik
                            enableReinitialize
                            initialValues={cvReview}
                            validate={(values) => {
                                let errors = {};
                                if (!values.fileName)
                                    errors.fileName = 'Upload CV!';

                                return errors;
                            }}
                            onSubmit={onSubmit}>
                            {props => {
                                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleReset } = props;
                                return (
                                    <Form>
                                        <div className="custom-file mb-3">
                                            <input type="file" className="custom-file-input" id="fileName" name="fileName" accept="application/pdf" onChange={e => { handleFileUpload(e) }} />
                                            <label className="custom-file-label" htmlFor="fileName">{selectedFile != undefined ? selectedFile.name : "Choose file"}</label>
                                            <ErrorMessage name="fileName">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        </div>

                                        <div className="mt-3" style={{ textAlign: "center" }}>
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
                                            <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => redirectToRoute('/cvReviews')}>Cancel</button>
                                        </div>
                                        {/* <div id="debug">
                                            {JSON.stringify(values)}
                                        </div> */}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>}

                    {/* Showing comments text area in underReview/submit state*/}
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
                            onSubmit={onCommentsSubmit}>
                            {props => {
                                const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleReset } = props;
                                return (
                                    <Form>
                                        {((cvReview.status == CVReviewStatus.underReview && group == constants.groups.ADMIN) || cvReview.status == CVReviewStatus.reviewCompleted) &&
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
                                            {group == constants.groups.ADMIN && (cvReview.status == CVReviewStatus.underReview || cvReview.status == CVReviewStatus.reviewCompleted) && <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>}
                                            {group == constants.groups.ADMIN && cvReview.status == CVReviewStatus.submitted && <button className="btn btn-primary" onClick={pickCvForReview}>Pick for Review</button>}
                                            {cvReview.status != CVReviewStatus.draft && <button className="btn btn-primary" style={{ marginLeft: "20px" }} onClick={() => redirectToRoute('/cvReviews')}>Back</button>}
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
    handleFileUpload: PropTypes.func.isRequired,
    isS3Uploading: PropTypes.bool.isRequired,
    numPages: PropTypes.number,
    onCommentsSubmit: PropTypes.func,
    onDocumentLoad: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    pageNumber: PropTypes.number,
    pickCvForReview: PropTypes.func,
    redirectToRoute: PropTypes.func.isRequired,
    selectedFile: PropTypes.object,
    shufflePage: PropTypes.func.isRequired,
    cvUrl: PropTypes.string.isRequired
};
//make this component available to the app
export default CVReview;
