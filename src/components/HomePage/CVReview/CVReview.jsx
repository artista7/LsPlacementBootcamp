//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*React-pdf configuration */
import { Document, Page, pdfjs } from 'react-pdf';
import { CVReviewStatus } from '../../../constants/constants';
import './CVReview.css';
/*circular progressbar */
import CircularProgressbar from 'react-circular-progressbar';
import { NotificationContainer } from 'react-notifications';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// create a component
const CVReview = ({ cvReview, handleSelectedFile, isS3Uploading, numPages, onDocumentLoad, onSubmit, pageNumber, percent, selectedFile, shufflePage }) => {
    return (
        <div>
            <NotificationContainer />
            <div className="row">
                <div className="col-sm-12 col-lg-6">
                    <p>Status: {cvReview.status}</p>
                    {/* Showing form in draft or submitted state only */}
                    {(cvReview.status == CVReviewStatus.draft || cvReview.status == CVReviewStatus.submitted) && <div>
                        <p>Upload CV:</p>
                        <div className="custom-file mb-3">
                            <input type="file" className="custom-file-input" id="uploadCV" accept="application/pdf" name="uploadCV" onChange={handleSelectedFile} />
                            <label className="custom-file-label" htmlFor="uploadCV">{selectedFile != undefined ? selectedFile.name : "Choose file"}</label>
                        </div>

                        <div className="mt-3" style={{ textAlign: "center" }}>
                            <button onClick={() => onSubmit()} className="btn btn-primary">{cvReview.status == CVReviewStatus.draft ? "Submit" : "Update"}</button>
                        </div>
                    </div>}
                    {/* Showing comments in completed review */}
                    {cvReview.status == CVReviewStatus.complete && <div style={{ textAlign: "center" }}>Comments Recieved</div>}
                </div>
                <div className="col-sm-12 col-lg-6" style={{ borderLeft: "1px #e6e6e6 solid", overflowY: "scroll", height: "calc(100vh - 60px)" }}>
                    <div id='pagePicker'>
                        {numPages > 1 && <p style={{ textAlign: "center" }}>
                            <i className="fa fa-angle-left link-button fa-in-circle" style={{ marginRight: "5px" }} onClick={() => shufflePage(0)}></i>
                            Page {pageNumber} of {numPages}
                            <i className="fa fa-angle-right link-button fa-in-circle" style={{ marginLeft: "5px" }} onClick={() => shufflePage(1)}></i>
                        </p>}
                    </div>
                    <div style={{ border: '1px solid #e6e6e6', marginBottom: "15px" }}>
                        <div id="s3Progressbar">
                            {isS3Uploading && <CircularProgressbar
                                percentage={percent}
                                text={`${percent}%`}
                                background
                                backgroundPadding={6}
                                styles={{
                                    background: {
                                        fill: 'rgb(204, 80, 74)',
                                    },
                                    text: {
                                        fill: '#fff',
                                    },
                                    path: {
                                        stroke: '#fff',
                                    },
                                    trail: { stroke: 'transparent' },
                                }}
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
    handleSelectedFile: PropTypes.func.isRequired,
    isS3Uploading: PropTypes.bool.isRequired,
    numPages: PropTypes.number,
    onDocumentLoad: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    pageNumber: PropTypes.number,
    percent: PropTypes.number.isRequired,
    selectedFile: PropTypes.object,
    shufflePage: PropTypes.func.isRequired
};
//make this component available to the app
export default CVReview;
