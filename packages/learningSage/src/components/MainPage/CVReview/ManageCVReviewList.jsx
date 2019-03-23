//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import * as cvReviewActions from '../../../actions/cvReviewActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CVReviewList from './CVReviewList';
import * as constants from '../../../constants/constants';

// create a component
class ManageCvReviewList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isInitializing: false
        }

        this.redirectToRoute = this.redirectToRoute.bind(this);
        this.setInitializing = this.setInitializing.bind(this);
    }

    redirectToRoute(route) {
        this.props.history.push(route);
    }

    setInitializing(bool) {
        this.setState({
            isInitializing: bool == true ? true : false
        })
    }

    render() {
        const { cvReviewList, history } = this.props;
        return (
            <div style={{ textAlign: "center", paddingTop: '10px' }}>
                {/* not showing create cv review to admin as of now */}
                {!(this.props.userInfo.group != undefined && this.props.userInfo.group == constants.groups.ADMIN) && <input
                    type="submit"
                    value="Create Cv Review"
                    className="btn btn-primary hCenter"
                    onClick={() => this.redirectToRoute('/cvReview')}></input>}

                {cvReviewList.length > 0 && <CVReviewList history={history} cvReviewList={cvReviewList}></CVReviewList>}

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        cvReviewList: state.cvReviews || [],
        userInfo: state.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch)
    };
}
ManageCvReviewList.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageCvReviewList);
