//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/cvReviewActions';
import { withAuthenticator } from 'aws-amplify-react';
import { Redirect } from "react-router-dom";

// create a component
class Login extends React.Component {
    componentDidMount() {
        this.props.updateStateVariable(true);
    }

    render() {
        return (
            <div>
                {this.props.authState == "signedIn" ? <Redirect to={{ pathname: "/" }}></Redirect> : null}
            </div>
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

Login.propTypes = {
    updateStateVariable: PropTypes.func.isRequired
};
//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(Login));
