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
class CustomConfirmSignUp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false
        }

        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.openSignInPage = this.openSignInPage.bind(this);
        this.resendCode = this.resendCode.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
    }

    confirmSignUp(username, code) {
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        }).then(data => {
            this.setIsLoading(false);
            NotificationManager.success("Signup confirmed");
            this.props.onStateChange('signIn', {});
        })
            .catch(err => {
                this.setIsLoading(false);
                NotificationManager.error(err.message);
            });
    }

    openSignInPage() {
        // to switch the authState to 'signIn'
        this.props.onStateChange('signIn', {});
    }

    resendCode(username) {
        Auth.resendSignUp(username).then(() => {
            NotificationManager.success('Code Resent');
        }).catch(e => {
            NotificationManager.error('Error sending code');
        });
    }

    setIsLoading(bool) {
        this.setState({
            isLoading: bool == true ? true : false
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.props.authState == "confirmSignUp" && <Formik
                    enableReinitialize
                    initialValues={{ username: "", code: "" }}
                    onSubmit={(values, actions) => {
                        this.setIsLoading(true);
                        this.confirmSignUp(values.username, values.code);
                        //NOTE need to call this on confirmSignUp complete
                        actions.setSubmitting(false);
                    }}
                    validate={(values) => {
                        let errors = {};
                        if (_.isEmpty(values.username))
                            errors.username = 'username is required';
                        if (_.isEmpty(values.code)) {
                            errors.code = 'code is required';
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
                                        <input type="password" className="fadeIn third" name="code" onChange={handleChange} placeholder="code" autoComplete="new-password" />
                                        <ErrorMessage name="code">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <p style={{ paddingLeft: "40px", "textAlign": "left" }}>
                                            Didn't get Code? <a style={{ display: "inline-block" }} onClick={() => this.resendCode(values.username)} href="#">Resend it</a>
                                        </p>
                                        {/* <input type="button" disabled={isSubmitting} className="fadeIn fourth" value="Resend Code" /> */}

                                        <input type="submit" disabled={isSubmitting} className="fadeIn fourth" value="Confirm Sign Up" />

                                        <div id="formFooter">
                                            <a style={{ display: "inline-block" }} className="underlineHover" onClick={this.openSignInPage} href="#">Sign In?</a>
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
CustomConfirmSignUp.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CustomConfirmSignUp);
