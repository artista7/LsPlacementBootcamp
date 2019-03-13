//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Auth.css';
import { Auth } from 'aws-amplify';
import { Formik, ErrorMessage, Form } from 'formik';
import _ from "lodash";
import Loader from 'react-loader-spinner';
import { NotificationManager } from 'react-notifications';

// create a component
class CustomSignIn extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false
        }

        this.openConfirmSignUpPage = this.openConfirmSignUpPage.bind(this);
        this.openSignUpPage = this.openSignUpPage.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    openConfirmSignUpPage() {
        // to switch the authState to 'signIn'
        this.props.onStateChange('confirmSignUp', {});
    }

    openSignUpPage() {
        this.props.onStateChange('signUp', {});
    }

    forgotPassword() {
        this.props.onStateChange('forgotPassword', {});
    }

    setIsLoading(bool) {
        this.setState({
            isLoading: bool == true ? true : false
        })
    }

    async signIn(username, password, validationData) {
        try {
            const user = await Auth.signIn(username, password, validationData);
            if (user.challengeName === 'SMS_MFA' ||
                user.challengeName === 'SOFTWARE_TOKEN_MFA') {
                this.setIsLoading(false);
                // You need to get the code from the UI inputs
                // and then trigger the following function with a button click
                //const code = getCodeFromUserInput();
                // If MFA is enabled, sign-in should be confirmed with the confirmation code
                // const loggedUser = await Auth.confirmSignIn(
                //     user,   // Return object from Auth.signIn()
                //     code,   // Confirmation code  
                //     mfaType // MFA Type e.g. SMS, TOTP.
                // );
            } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                this.setIsLoading(false);
                //const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                // You need to get the new password and required attributes from the UI inputs
                // and then trigger the following function with a button click
                // For example, the email and phone_number are required attributes
                //const { username, email, phone_number } = getInfoFromUserInput();
                //const loggedUser = await Auth.completeNewPassword(
                //user,               // the Cognito User Object
                //newPassword,       // the new password
                // OPTIONAL, the required attributes
                //     {
                //         email,
                //         phone_number,
                //     }
                // );
            } else if (user.challengeName === 'MFA_SETUP') {
                this.setIsLoading(false);
                // This happens when the MFA method is TOTP
                // The user needs to setup the TOTP before using it
                // More info please check the Enabling MFA part
                //Auth.setupTOTP(user);
            } else {
                // The user directly signs in
                this.setIsLoading(false);
                this.props.onStateChange('signedIn', user);
                this.props.updateStateVariable();
            }
        } catch (err) {
            this.setIsLoading(false);
            if (err.code === 'UserNotConfirmedException') {
                this.openConfirmSignUpPage();
                // The error happens if the user didn't finish the confirmation step when signing up
                // In this case you need to resend the code and confirm the user
                // About how to resend the code and confirm the user, please check the signUp part
            } else if (err.code === 'PasswordResetRequiredException') {
                // The error happens when the password is reset in the Cognito console
                // In this case you need to call forgotPassword to reset the password
                // Please check the Forgot Password part.
            } else {
                NotificationManager.error(err.message);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.authState == "signIn" && <Formik
                    enableReinitialize
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values, actions) => {
                        this.setIsLoading(true);
                        this.signIn(values.username, values.password);
                        //NOTE need to call this on signUp complete
                        actions.setSubmitting(false);
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (_.isEmpty(values.username))
                            errors.username = 'username is required';
                        if (_.isEmpty(values.password)) {
                            errors.password = 'password is required';
                        }
                        return errors;
                    }}>
                    {props => {
                        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleReset } = props;
                        return (
                            <Form>
                                {this.state.isLoading && <div className="pageCenter"><Loader
                                    type="Triangle"
                                    color="rgb(204,80,74)"
                                /></div>}
                                <div className="wrapper fadeInDown">
                                    <div id="formContent">
                                        <input type="text" className="fadeIn second" name="username" onChange={handleChange} placeholder="username" autoComplete="new-password" />
                                        <ErrorMessage name="username">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="password" className="fadeIn third" name="password" onChange={handleChange} placeholder="password" autoComplete="new-password" />
                                        <ErrorMessage name="password">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <p className="fadeIn third" style={{ paddingLeft: "40px", "textAlign": "left" }}>
                                            Forgot password? <a style={{ display: "inline-block" }} onClick={this.forgotPassword} href="#">Reset it</a>
                                        </p>

                                        <input type="submit" disabled={isSubmitting} className="fadeIn fourth" value="Log In" />

                                        <div id="formFooter">
                                            {/* <a className="underlineHover" href="#">Forgot Password?</a> */}
                                            <a style={{ display: "inline-block" }} className="underlineHover" onClick={this.openSignUpPage} href="#">Sign up?</a>
                                        </div>
                                    </div>
                                </div>
                                {/* <div id="debug">
                                    {JSON.stringify(values)}
                                </div> */}
                            </Form>
                        );
                    }}
                </Formik>}
            </React.Fragment>
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
        //actions: bindActionCreators(actions, dispatch)
    };
}
CustomSignIn.propTypes = {
    updateStateVariable: PropTypes.func.isRequired
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CustomSignIn);
