//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/cvReviewActions';
import { Authenticator, ConfirmSignUp, Loading, ForgotPassword, SignIn, SignUp } from 'aws-amplify-react';
import { Redirect } from "react-router-dom";
/*Custom screens*/
import CustomSignIn from './CustomSignIn';
import CustomSignUp from './CustomSignUp';
import CustomConfirmSignUp from './CustomConfirmSignUp';
import CustomForgotPassword from './CustomForgotPassword';
import CustomLoading from './CustomLoading';

// create a component
class Login extends React.Component {
    componentDidMount() {
        this.props.updateStateVariable(true);
    }

    render() {
        return (
            <Authenticator
                hideDefault={true}
                onStateChange={(authState) => {     // Fired when Authentication State changes
                    if (authState == "signedIn") {
                        this.props.updateStateVariable();
                    }
                }}>
                <CustomSignIn override={SignIn} updateStateVariable={this.props.updateStateVariable} />
                {/* <ConfirmSignIn /> */}
                {/* <RequireNewPassword /> */}
                <CustomLoading override={Loading} />
                <CustomSignUp override={SignUp} />
                <CustomConfirmSignUp override={ConfirmSignUp} />
                {/* <VerifyContact /> */}
                <CustomForgotPassword override={ForgotPassword} />
                {/* <TOTPSetup /> */}
            </Authenticator>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
