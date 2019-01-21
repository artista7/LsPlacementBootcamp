//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/toDoActions';

// create a component
class ToDo extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.createToDo = this.createToDo.bind(this);
    }

    createToDo = function () {
        this.props.actions.createTodo({ name: "test", description: "test" })
    }

    componentDidMount() {
        this.props.actions.listTodos();
    }

    render() {
        return (
            <div>
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
ToDo.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
