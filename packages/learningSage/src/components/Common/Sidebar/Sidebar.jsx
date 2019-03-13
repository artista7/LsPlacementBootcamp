//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* sideNavbar*/
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as constants from '../../../constants/constants';

// create a component
const Sidebar = ({ accessibleAppModules, onModuleSelect, onToggle, selectedModule }) => {
    return (
        <SideNav onSelect={onModuleSelect} onToggle={onToggle}>
            <SideNav.Toggle />
            <SideNav.Nav selected={selectedModule}>
                {accessibleAppModules.map(accessibleAppModule => (
                    <NavItem key={accessibleAppModule} eventKey={accessibleAppModule}>
                        <NavIcon>
                            <i className={constants.appModuleIcons[accessibleAppModule]} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            {accessibleAppModule}
                        </NavText>
                    </NavItem>
                ))}
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
