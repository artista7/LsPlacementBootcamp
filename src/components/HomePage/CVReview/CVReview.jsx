//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// create a component
const CVReview = ({ handleselectedFile, numPages, onDocumentLoad, pageNumber, selectedFile, shufflePage }) => {
    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-lg-6">
                    <form action="/action_page.php">
                        <p>Upload CV:</p>
                        <div className="custom-file mb-3">
                            <input type="file" className="custom-file-input" id="uploadCV" accept="application/pdf" name="uploadCV" onChange={handleselectedFile} />
                            <label className="custom-file-label" htmlFor="uploadCV">{selectedFile != undefined ? selectedFile.name : "Choose file"}</label>
                        </div>

                        <div className="mt-3" style={{ textAlign: "center" }}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-lg-6" style={{ borderLeft: "1px solid black", overflowY: "scroll", height: "calc(100vh - 60px)" }}>
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoad}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    {numPages > 1 && <p style={{ textAlign: "center" }}>
                        <i className="fa fa-angle-left link-button fa-in-circle" style={{ marginRight: "5px" }} onClick={() => shufflePage(0)}></i>
                        Page {pageNumber} of {numPages}
                        <i className="fa fa-angle-right link-button fa-in-circle" style={{ marginLeft: "5px" }} onClick={() => shufflePage(1)}></i>
                    </p>}
                </div>
            </div>
        </div>
    );
};

CVReview.propTypes = {
    handleselectedFile: PropTypes.func.isRequired,
    numPages: PropTypes.number,
    onDocumentLoad: PropTypes.func,
    pageNumber: PropTypes.number,
    selectedFile: PropTypes.object,
    shufflePage: PropTypes.func.isRequired
};
//make this component available to the app
export default CVReview;
