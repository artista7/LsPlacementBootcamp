//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Auth } from 'aws-amplify';
import { Formik, ErrorMessage, Form } from 'formik';
import _ from "lodash";
import Loader from 'react-loader-spinner';
import { NotificationManager } from 'react-notifications';

// create a component
class CustomForgotPassword extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCodeSent: false,
            isLoading: false,
            username: ""
        }

        this.forgotPassword = this.forgotPassword.bind(this);
        this.forgotPasswordSubmit = this.forgotPasswordSubmit.bind(this);
        this.openSignInPage = this.openSignInPage.bind(this);
        this.setIsCodeSent = this.setIsCodeSent.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.setUsername = this.setUsername.bind(this);
    }

    forgotPassword(username) {
        this.setUsername(username);
        Auth.forgotPassword(username)
            .then(data => {
                this.setIsLoading(false);
                this.setIsCodeSent(true);
            })
            .catch(err => {
                this.setIsLoading(false);
                NotificationManager.error(err.message);
            });
    }

    forgotPasswordSubmit(username, code, newPassword) {
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then(data => {
                this.setIsLoading(false);
                this.props.onStateChange('signIn', {});
            })
            .catch(err => {
                this.setIsLoading(false);
                NotificationManager.error(err.message);
            });
    }

    openSignInPage() {
        this.props.onStateChange('signIn', {});
    }

    setIsCodeSent(bool) {
        this.setState({
            isCodeSent: bool == true ? true : false
        })
    }

    setIsLoading(bool) {
        this.setState({
            isLoading: bool == true ? true : false
        })
    }

    setUsername(username) {
        this.setState({
            username: username
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.authState == "forgotPassword" && this.state.isCodeSent == false && <Formik
                    enableReinitialize
                    initialValues={{ username: "", code: "" }}
                    onSubmit={(values, actions) => {
                        this.setIsLoading(true);
                        this.forgotPassword(values.username);
                        //NOTE need to call this on confirmSignUp complete
                        actions.setSubmitting(false);
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (_.isEmpty(values.username))
                            errors.username = 'username is required';
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
                                        <input type="text" className="fadeIn second" name="username" onChange={handleChange} placeholder="username" autocomplete="new-password" />
                                        <ErrorMessage name="username">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>

                                        <input type="submit" disabled={isSubmitting} className="fadeIn fourth" value="Send Code" />

                                        <div id="formFooter">
                                            <a style={{ display: "inline-block" }} className="underlineHover" onClick={this.openSignInPage} href="#">Back to Sign In</a>
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

                {this.props.authState == "forgotPassword" && this.state.isCodeSent == true && <Formik
                    enableReinitialize
                    initialValues={{ username: "", code: "" }}
                    onSubmit={(values, actions) => {
                        this.setIsLoading(true);
                        var username = this.state.username;
                        this.forgotPasswordSubmit(username, values.code, values.newPassword);
                        //NOTE need to call this on confirmSignUp complete
                        actions.setSubmitting(false);
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (_.isEmpty(values.code))
                            errors.username = 'code is required';
                        if (_.isEmpty(values.newPassword))
                            errors.newPassword = 'new password is required';
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
                                        <input type="text" className="fadeIn second" name="code" onChange={handleChange} placeholder="code" autocomplete="new-password" />
                                        <ErrorMessage name="code">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="password" className="fadeIn second" name="newPassword" onChange={handleChange} placeholder="new password" autocomplete="new-password" />
                                        <ErrorMessage name="newPassword">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>

                                        <input type="submit" disabled={isSubmitting} className="fadeIn fourth" value="Reset Password" />

                                        <div id="formFooter">
                                            <a style={{ display: "inline-block" }} className="underlineHover" onClick={this.openSignInPage} href="#">Back to Sign In</a>
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
CustomForgotPassword.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CustomForgotPassword);
