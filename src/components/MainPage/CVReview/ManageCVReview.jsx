//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cvReviewActions from '../../../actions/cvReviewActions';
import * as userInfoActions from '../../../actions/userInfoActions';
import CVReview from './CVReview';
import { CVReviewStatus } from '../../../constants/constants';
import { Storage } from 'aws-amplify';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';

// create a component
class ManageCVReview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cvReview: { id: null, createdBy: null, lastUpdatedBy: null, s3FilePath: null, fileName: null, status: CVReviewStatus.draft, reviewedBy: null, comments: null },
            isS3Uploading: false,
            loaded: 0,
            numPages: null,
            pageNumber: 1,
            percent: 0,
            selectedFile: null,
            cvUrl: ""
        }

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.isSubmitAllowed = this.isSubmitAllowed.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.redirectToRoute = this.redirectToRoute.bind(this);
        this.setCvReview = this.setCvReview.bind(this);
        this.setCvUrl = this.setCvUrl.bind(this);
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
            });
        }
        else {
            NotificationManager.warning('File size exceeds 5Mb', 'Warning!', 2000);
        }
    }

    isSubmitAllowed() {
        debugger;
        try {
            if (this.props.userPricingPlan.cvReviewsAllowed > this.props.userInfo.cvReviewsTaken) {
                return true;
            }
            return false;
        }
        catch{
            return false;
        }
    }

    onCancel(event) {
        event.preventDefault();
        this.redirectToRoute('/cvReviews');
    }

    onDocumentLoad(numPages) {
        this.setState({ numPages: numPages.numPages, pageNumber: 1 });
    }

    onSubmit() {
        try {
            //check if user is allowed to submit cv
            //if not, through notification warning and redirect to previous page
            if (!this.isSubmitAllowed()) {
                NotificationManager.error("Cv Review limit reached", "Upgrade plan", 6000);
                this.redirectToRoute('/cvReviews');
            }
            else {
                //if yes
                this.setIsS3Uploading(true);
                var setPercent = this.setPercent;
                var redirectToRoute = this.redirectToRoute;
                var s3FileName = this.state.selectedFile.name != undefined ? +(new Date) + '_' + this.state.selectedFile.name : '';
                let username = this.props.userInfo.username != undefined ? this.props.userInfo.username : "";  //NOTE - need to handle case when username is not retrieved
                Storage.put(s3FileName, this.state.selectedFile, {
                    level: 'protected',
                    contentType: 'application/pdf',
                    progressCallback(progress) {
                        setPercent(Math.floor(progress.loaded * 100 / progress.total));
                    }
                })
                    .then(result => {
                        //add cvReview into dynamo table
                        let createCvReviewInput = {
                            comments: "none",
                            createdBy: username,
                            fileName: s3FileName,
                            lastUpdatedBy: username,
                            reviewedBy: "none",
                            status: "submitted"
                        };

                        this.props.cvReviewActions._createCvReview(createCvReviewInput).then(response => {
                            redirectToRoute('/cvReviews');
                        }).catch(response => {
                        });

                        //edit userInfo to update cvReviewsTaken
                        debugger;
                        this.props.userInfoActions._updateUser({ ...this.props.userInfo, cvReviewsTaken: this.props.userInfo.cvReviewsTaken + 1 });
                        this.setIsS3Uploading(false);
                    })
                    .catch(err => {
                        this.setIsS3Uploading(false);
                        console.log(err);
                    });
            }
        }
        catch (err) {
            alert("debugger" + err);
        }
    }

    redirectToRoute(route) {
        this.props.history.push(route);
    }

    setCvReview(cvReview) {
        this.setState({
            cvReview: cvReview
        })
    }

    setCvUrl(cvUrl) {
        this.setState({
            cvUrl: cvUrl
        })
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
        this.setCvReview(this.props.cvReview);

        var fileName = this.props.cvReview.fileName;
        if (!_.isEmpty(fileName)) {
            var setPercent = this.setPercent;
            var setCvUrl = this.setCvUrl;
            Storage.get(fileName, {
                level: 'protected',
                contentType: 'application/pdf',
                progressCallback(progress) {
                    setPercent(Math.floor(progress.loaded * 100 / progress.total));
                }
            }).then(result => {
                setCvUrl(result);
            }).catch(error => {
                NotificationManager.error("Can't fetch cv preview", "Error", 2000);
                console.log(error)
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //updating state on cvReview in redux state changes
        if (JSON.stringify(prevProps.cvReview) != JSON.stringify(this.props.cvReview)) {
            this.setState({
                cvReview: this.props.cvReview
            })
        }
    }

    render() {
        return (
            <CVReview
                cvReview={this.state.cvReview}
                handleFileUpload={this.handleFileUpload}
                isS3Uploading={this.state.isS3Uploading}
                numPages={this.state.numPages}
                onCancel={this.onCancel}
                onDocumentLoad={this.onDocumentLoad}
                onSubmit={this.onSubmit}
                pageNumber={this.state.pageNumber}
                selectedFile={this.state.selectedFile}
                shufflePage={this.shufflePage}
                cvUrl={this.state.cvUrl}>
            </CVReview>
        );
    }
}

function getCvReviewById(cvReviews, id) {
    const cvReview = cvReviews.filter(cvReview => cvReview.id == id);
    if (cvReview) { return cvReview[0]; }
    return null;
}

function getUserPricingPlan(pricingPlans, userInfo) {
    debugger;
    try {
        debugger;
        const userPricingPlan = pricingPlans.filter(pricingPlan => pricingPlan.id == userInfo.pricingPlanId);
        if (userPricingPlan) { return userPricingPlan[0]; }
    }
    catch{
        return null;
    }
}

function mapStateToProps(state, ownProps) {
    var cvReviewId = null;
    if (ownProps.match && ownProps.match.params.id != undefined) {
        cvReviewId = ownProps.match.params.id;
    }

    let cvReview = { id: null, createdBy: null, lastUpdatedBy: null, s3FilePath: null, fileName: null, status: CVReviewStatus.draft, reviewedBy: null, comments: null };
    if (cvReviewId && state.cvReviews && state.cvReviews.length > 0) {
        cvReview = getCvReviewById(state.cvReviews, cvReviewId);
    }

    let userPricingPlan = getUserPricingPlan(state.pricingPlans, state.userInfo);

    let userInfo = state.userInfo;
    //override cvReview from redux state
    return {
        cvReview: cvReview,
        userInfo: userInfo,
        userPricingPlan: userPricingPlan
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch),
        userInfoActions: bindActionCreators(userInfoActions, dispatch)
    };
}
ManageCVReview.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageCVReview);