//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ensureArray from 'ensure-array';
/* breadcrumbs */
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import '@trendmicro/react-breadcrumbs/dist/react-breadcrumbs.css';

// create a component
const breadcrumbs = ({ pageTitle, selectedModule }) => {
    const list = ensureArray(pageTitle[selectedModule]);
    return (
        <Breadcrumbs showLineSeparator>
            {list.map((item, index) => (
                <Breadcrumbs.Item
                    active={index === list.length - 1}
                    key={`${selectedModule}_${index}`}>
                    {item}
                </Breadcrumbs.Item>
            ))}
        </Breadcrumbs>
    );
};

breadcrumbs.propTypes = {
    pageTitle: PropTypes.object.isRequired,
    selectedModule: PropTypes.string.isRequired
};
//make this component available to the app
export default breadcrumbs;
