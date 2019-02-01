//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/toDoActions';
import CVReview from './CVReview';
import { CVReviewStatus } from '../../../constants/constants';
import { Storage } from 'aws-amplify';
import { NotificationManager } from 'react-notifications';

// create a component
class ManageCVReview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cvReview: { status: CVReviewStatus.draft },
            isS3Uploading: false,
            loaded: 0,
            numPages: null,
            pageNumber: 1,
            percent: 0,
            selectedFile: null
        }

        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setIsS3Uploading = this.setIsS3Uploading.bind(this);
        this.setPercent = this.setPercent.bind(this);
        this.shufflePage = this.shufflePage.bind(this);
    }

    handleSelectedFile(event) {
        var selectedFile = event.target.files[0];
        if (selectedFile.size && selectedFile.size < 5242880) {
            this.setState({
                loaded: 0,
                selectedFile: event.target.files[0]
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
            Storage.put('cv.pdf', this.state.selectedFile, {
                level: 'protected',
                contentType: 'application/pdf',
                progressCallback(progress) {
                    setPercent(Math.floor(progress.loaded * 100 / progress.total));
                }
            })
                .then(result => {
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

    render() {
        return (
            <CVReview
                cvReview={this.state.cvReview}
                handleSelectedFile={this.handleSelectedFile}
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
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
ManageCVReview.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageCVReview);
