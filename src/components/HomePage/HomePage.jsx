//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/toDoActions';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
/* sidebar*/
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
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
            //selected: 'home',
            expanded: false
        };

        this.createToDo = this.createToDo.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    createToDo() {
        this.props.actions.createTodo({ name: "test", description: "test" })
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
        this.props.actions.listTodos();
    }

    componentWillUnmount() {
        this.props.updateStateVariable();
    }

    render() {
        const { expanded } = this.state;
        return (
            <div>
                <SideNav onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="devices">
                            <NavIcon>
                                <i className="fa fa-fw fa-trash" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Devices
                        </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    <button onClick={this.signOut}>Sign Out</button>
                    <button onClick={this.createToDo}>Create To Do</button>
                    {this.props.toDos.map(toDo => {
                        return <div key={toDo.id}>{toDo.name} - {toDo.id}</div>
                    })}
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
    updateStateVariable: PropTypes.func.isRequired
};

//make this component available to the app
export default withAuthenticator(connect(mapStateToProps, mapDispatchToProps)(HomePage));
