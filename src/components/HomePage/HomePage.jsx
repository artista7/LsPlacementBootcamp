//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/toDoActions';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

// create a component
class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.createToDo = this.createToDo.bind(this);
    }

    createToDo = function () {
        this.props.actions.createTodo({ name: "test", description: "test" })
    }

    signOut() {
        Auth.signOut().then(data => {
            this.props.updateStateVariable();
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.props.actions.listTodos();
    }

    componentWillUnmount() {
        this.props.updateStateVariable();
    }

    render() {
        return (
            <div>
                <button onClick={this.signOut}>Sign Out</button>
                <button onClick={this.createToDo}>Create To Do</button>
                {this.props.toDos.map(toDo => {
                    return <div key={toDo.id}>{toDo.name} - {toDo.id}</div>
                })}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    let toDos = state.toDoReducer.toDos;
    return {
        toDos: toDos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

HomePage.propTypes = {
    updateStateVariable: PropTypes.func.isRequired
};

//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(HomePage));
