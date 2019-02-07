//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvReviewActions from '../../../actions/cvReviewActions';
import CVReview from './CVReview';
import { CVReviewStatus } from '../../../constants/constants';
import { Auth, Storage } from 'aws-amplify';
import { NotificationManager } from 'react-notifications';

// create a component
class ManageCVReview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cvReview: { id: null, userId: null, createdAt: null, lastUpdatedAt: null, lastUpdatedBy: null, s3FilePath: null, fileName: null, status: CVReviewStatus.draft, reviewedBy: null, comments: null },
            isS3Uploading: false,
            loaded: 0,
            numPages: null,
            pageNumber: 1,
            percent: 0,
            selectedFile: null
        }

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setIsS3Uploading = this.setIsS3Uploading.bind(this);
        this.setPercent = this.setPercent.bind(this);
        this.shufflePage = this.shufflePage.bind(this);
    }

    handleFileUpload(event) {
        var selectedFile = event.target.files[0];
        if (selectedFile.size && selectedFile.size < 5242880) {
            this.setState({
                loaded: 0,
                cvReview: Object.assign({}, this.state.cvReview, { fileName: selectedFile.name != undefined ? selectedFile.name : "" }),
                selectedFile: selectedFile
            })
        }
        else {
            NotificationManager.warning('File size exceeds 5Mb', 'Warning!', 2000);
        }
    }

    onDocumentLoad(numPages) {
        this.setState({ numPages: numPages.numPages, pageNumber: 1 });
    }

    onSubmit() {
        try {
            this.setIsS3Uploading(true);
            var setPercent = this.setPercent;
            var s3FileName = this.state.selectedFile.name != undefined ? +(new Date) + '_' + this.state.selectedFile.name : '';
            let userId = this.props.userInfo.id != undefined ? this.props.userInfo.id : "";  //need to handle case when userId is not retrieved
            Storage.put(s3FileName, this.state.selectedFile, {
                level: 'protected',
                contentType: 'application/pdf',
                progressCallback(progress) {
                    setPercent(Math.floor(progress.loaded * 100 / progress.total));
                }
            })
                .then(result => {
                    //This code should trigger through lambda while adding cv into s3 for ml stuff
                    //add cvReview into dynamo table
                    let createCvReviewInput = {
                        comments: "none",
                        createdAt: +(new Date),
                        fileName: this.state.selectedFile.name,
                        lastUpdatedAt: +(new Date),
                        lastUpdatedBy: userId,
                        reviewedBy: "none",
                        status: "submitted",
                        userId: userId
                    }
                    this.props.cvReviewActions._createCvReview(createCvReviewInput);
                    this.setIsS3Uploading(false);
                })
                .catch(err => {
                    this.setIsS3Uploading(false);
                    console.log(err);
                });
        }
        catch (err) {
            alert("debugger" + err);
        }
    }

    setIsS3Uploading(bool) {
        this.setState({
            isS3Uploading: bool == true ? true : false
        })
    }

    setPercent(percent) {
        this.setState({
            percent: percent
        })
    }

    shufflePage(forward) {
        if (forward && this.state.pageNumber < this.state.numPages) {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            });
        }
        else if (!forward && this.state.pageNumber > 1) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            })
        }
    }

    componentDidMount() {
        this.setState({
            cvReview: this.props.cvReview
        });
    }

    render() {
        return (
            <CVReview
                cvReview={this.state.cvReview}
                handleFileUpload={this.handleFileUpload}
                isS3Uploading={this.state.isS3Uploading}
                numPages={this.state.numPages}
                onDocumentLoad={this.onDocumentLoad}
                onSubmit={this.onSubmit}
                pageNumber={this.state.pageNumber}
                percent={this.state.percent}
                selectedFile={this.state.selectedFile}
                shufflePage={this.shufflePage}>
            </CVReview>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let cvReview = { id: null, userId: null, createdAt: null, lastUpdatedAt: null, lastUpdatedBy: null, s3FilePath: null, fileName: null, status: CVReviewStatus.draft, reviewedBy: null, comments: null };
    let userInfo = state.userInfoReducer.userInfo;
    //override cvReview from redux state
    return {
        cvReview: cvReview,
        userInfo: userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch)
    };
}
ManageCVReview.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageCVReview);
