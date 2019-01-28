//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/toDoActions';
import CVReview from './CVReview';

// create a component
class ManageCVReview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loaded: 0,
            numPages: null,
            pageNumber: 1,
            selectedFile: null
        }

        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.onDocumentLoad = this.onDocumentLoad.bind(this);
        this.shufflePage = this.shufflePage.bind(this);
    }

    handleselectedFile(event) {
        this.setState({
            loaded: 0,
            selectedFile: event.target.files[0]
        })
    }

    onDocumentLoad(numPages) {
        this.setState({ numPages: numPages.numPages });
    }

    shufflePage(forward) {
        if (forward && this.state.pageNumber < this.state.numPages) {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            });
        }
        else if (!forward && this.state.pageNumber > 1) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            })
        }
    }

    render() {
        return (
            <CVReview
                numPages={this.state.numPages}
                onDocumentLoad={this.onDocumentLoad}
                pageNumber={this.state.pageNumber}
                handleselectedFile={this.handleselectedFile}
                selectedFile={this.state.selectedFile}
                shufflePage={this.shufflePage}>
            </CVReview>
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
ManageCVReview.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ManageCVReview);
