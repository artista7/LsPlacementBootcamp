//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/toDoActions';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { Switch, Route, Redirect } from "react-router-dom";
/*styled components */
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumbs from '../Common/Breadcrumbs';
import * as constants from '../../constants/constants';
/*Child components */
import ManageCVReview from './CVReview/ManageCVReview';

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

// create a component
class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            expanded: false,
            pageTitle: {
                'home': 'Home',
                'cv': 'CV Evaluation',
                'devices': ['Devices'],
                'reports': ['Reports'],
                'settings/policies': ['Settings', 'Policies'],
                'settings/network': ['Settings', 'Network']
            },
            selected: 'home'
        };

        this.createToDo = this.createToDo.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    createToDo() {
        this.props.actions.createTodo({ name: "test", description: "test" })
    }

    onSelect(selected) {
        if (selected == constants.SIGN_OUT) {
            this.signOut();
        }
        const to = '/' + selected;
        if (this.props.location.pathname !== to) {
            this.setState({ selected: selected })
            this.props.history.push(to);
        }
    }

    onToggle(expanded) {
        this.setState({ expanded: expanded });
    };

    signOut() {
        Auth.signOut().then(data => {
            //this.props.updateStateVariable();
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        //this.props.actions.listTodos();
        var selected = this.props.history.location.pathname;
        if (selected == "" || selected == "/") {
            this.setState({
                selected: 'home'
            });
        }
        else {
            this.setState({
                selected: selected.substring(1)
            });
        }
    }

    componentWillUnmount() {
        this.props.updateStateVariable();
    }

    render() {
        const { expanded, pageTitle, selected } = this.state;
        return (
            <div>
                <Sidebar onSelect={this.onSelect} onToggle={this.onToggle} selected={selected}></Sidebar>
                <Main expanded={expanded} style={{ height: "100vh", overflowY: "scroll" }}>
                    <Breadcrumbs pageTitle={pageTitle} selected={selected}></Breadcrumbs>
                    <Switch>
                        <Route path="/" exact component={props => <div>home</div>} />
                        <Route exact path="/cv" component={props => <ManageCVReview></ManageCVReview>} />
                        <Route path="/settings/*" component={props => <div>settings</div>} />
                        <Route path="*" render={() => (<Redirect to={{ pathname: "/" }}></Redirect>)}></Route>
                    </Switch>
                    {/* <button onClick={this.createToDo}>Create To Do</button>
                    {this.props.toDos.map(toDo => {
                        return <div key={toDo.id}>{toDo.name} - {toDo.id}</div>
                    })} */}
                </Main>
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
    history: PropTypes.object,
    location: PropTypes.object,
    updateStateVariable: PropTypes.func.isRequired
};

//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(HomePage));
