//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader-spinner';

// create a component
class CustomLoading extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <React.Fragment>
                {this.props.authState == "loading" && <div className="pageCenter"><Loader
                    type="Triangle"
                    color="rgb(204,80,74)"
                />
                </div>}
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
CustomLoading.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CustomLoading);
