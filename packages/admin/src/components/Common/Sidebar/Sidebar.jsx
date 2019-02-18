//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* sideNavbar*/
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as constants from '../../../constants/constants';

// create a component
const Sidebar = ({ onModuleSelect, onToggle, selectedModule }) => {
    return (
        <SideNav onSelect={onModuleSelect} onToggle={onToggle}>
            <SideNav.Toggle />
            <SideNav.Nav selected={selectedModule}>
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                </NavText>
                </NavItem>
                <NavItem eventKey="cvReviews">
                    <NavIcon>
                        <i className="fa fa-fw fa-file-text-o" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        CV Review
                </NavText>
                </NavItem>
                {/* <NavItem eventKey="settings">
                    <NavIcon>
                        <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                    </NavIcon>
                    <NavText style={{ paddingRight: 32 }} title="Settings">
                        Settings
                </NavText>
                    <NavItem eventKey="settings/policies">
                        <NavText title="Policies">
                            Policies
                    </NavText>
                    </NavItem>
                    <NavItem eventKey="settings/network">
                        <NavText title="Network">
                            Network
                    </NavText>
                    </NavItem>
                </NavItem> */}
                <NavItem eventKey={constants.SIGN_OUT}>
                    <NavIcon>
                        <i className="fa fa-fw fa-times" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Sign Out
                </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

Sidebar.prototypes = {
    onModuleSelect: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    selectedModule: PropTypes.string.isRequired
}
//make this component available to the app
export default Sidebar;
