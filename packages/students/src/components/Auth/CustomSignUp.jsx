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
class CustomSignUp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: false
        }
        this.openSignInPage = this.openSignInPage.bind(this);
        this.setIsLoading = this.setIsLoading.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    openSignInPage() {
        // to switch the authState to 'signIn'
        this.props.onStateChange('signIn', {});
    }

    setIsLoading(bool) {
        this.setState({
            isLoading: bool == true ? true : false
        })
    }

    signUp(username, password, email, phone_number, group, validationData) {
        Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                //group
                // other custom attributes 
            }
            //validationData: []  //optional
        })
            .then(data => {
                this.setIsLoading(false);
                if (!data.userConfirmed) {
                    this.props.onStateChange('confirmSignUp', data.user);
                }
                //console.log(data);
            })
            .catch(err => {
                this.setIsLoading(false);
                if (err.code == "InvalidParameterException") {
                    if (err.message.indexOf("phone number" != -1)) {
                        NotificationManager.error('Wrong Phone number format, add ISD code', '', 6000);
                    }
                }
                else {
                    NotificationManager.error(err.message);
                }
                //NOTE if user already exists
                //console.log(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.authState == "signUp" && <Formik
                    enableReinitialize
                    initialValues={{ username: "", password: "", email: "", phone_number: "", group: "student", validationData: {} }}
                    onSubmit={(values, actions) => {
                        if (values.validationData.collegePasscode == undefined || _.isEmpty(values.validationData.collegePasscode)) {
                            NotificationManager.warning('College passcode is required', '', 2000);
                        }
                        else {
                            this.setIsLoading(true);
                            this.signUp(values.username, values.password, values.email, values.phone_number, values.validationData);
                        }
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
                        if (_.isEmpty(values.email)) {
                            errors.email = 'email is required';
                        }
                        if (_.isEmpty(values.phone_number)) {
                            errors.phone_number = 'phone_number is required';
                        }
                        // if (values.validationData.collegePasscode == undefined || _.isEmpty(values.validationData.collegePasscode)) {
                        //     errors.collegepasscode = 'collegePasscode is required';
                        // }
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
                                        <input type="text" className="fadeIn second" name="username" onChange={handleChange} placeholder="uesrname" autocomplete="new-password" />
                                        <ErrorMessage name="username">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="password" className="fadeIn third" name="password" onChange={handleChange} placeholder="password" autocomplete="new-password" />
                                        <ErrorMessage name="password">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="email" className="fadeIn third" name="email" onChange={handleChange} placeholder="email" autocomplete="new-password" />
                                        <ErrorMessage name="email">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="tel" className="fadeIn third" name="phone_number" onChange={handleChange} placeholder="phone number (+919999966666)" autocomplete="new-password" />
                                        <ErrorMessage name="phone_number">{msg => <div className="errorText">{msg}</div>}</ErrorMessage>
                                        <input type="text" className="fadeIn third" name="validationData.collegePasscode" onChange={handleChange} placeholder="college passcode" autocomplete="new-password" />
                                        {/* <ErrorMessage name="collegepasscode">{msg => <div className="errorText">{msg}</div>}</ErrorMessage> */}

                                        <input type="submit" disabled={isSubmitting} className="fadeIn fourth" value="Sign Up" />

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
CustomSignUp.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CustomSignUp);
