//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import * as cvReviewActions from '../../../actions/cvReviewActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner'
import CVReviewTable from './CVReviewTable';
// create a component
class CVReviewList extends React.Component {
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
        const { cvReviewList } = this.props;
        return (
            <div>
                <input
                    type="submit"
                    value="Create Cv Review"
                    className="btn btn-primary"
                    onClick={() => this.redirectToRoute('/cvReview')}></input>
                {cvReviewList.length > 0 && <CVReviewTable cvReviewList={cvReviewList}></CVReviewTable>}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        cvReviewList: state.cvReviews || []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch)
    };
}
CVReviewList.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CVReviewList);