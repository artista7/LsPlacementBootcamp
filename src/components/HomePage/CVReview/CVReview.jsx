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
const CVReview = ({ cvReview, handleFileUpload, isS3Uploading, numPages, onDocumentLoad, onSubmit, pageNumber, selectedFile, shufflePage }) => {
    return (
        <div>
            <div className="row">
                {/* Left panel - Form */}
                <div className="col-sm-12 col-lg-6">
                    <p>Status: {cvReview.status}</p>
                    {/* Showing form in draft or submitted state only */}
                    {(cvReview.status == CVReviewStatus.draft || cvReview.status == CVReviewStatus.submitted) && <div>
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
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">{cvReview.status == CVReviewStatus.draft ? "Submit" : "Update"}</button>
                                        </div>
                                        {/* <div id="debug">
                                            {JSON.stringify(values)}
                                        </div> */}
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>}
                    {/* Showing comments in completed review */}
                    {cvReview.status == CVReviewStatus.complete && <div style={{ textAlign: "center" }}>Comments Recieved</div>}
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
                            file={selectedFile}
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
    onDocumentLoad: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    pageNumber: PropTypes.number,
    selectedFile: PropTypes.object,
    shufflePage: PropTypes.func.isRequired
};
//make this component available to the app
export default CVReview;
