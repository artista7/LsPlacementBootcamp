//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from './HomePage';

// create a component
class ManageHomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <React.Fragment>
                <HomePage></HomePage>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
ManageHomePage.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageHomePage);
