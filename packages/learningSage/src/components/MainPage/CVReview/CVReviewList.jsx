//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    DataTypeProvider,
    FilteringState, SortingState, PagingState, SelectionState, GroupingState, SearchState,
    IntegratedFiltering, IntegratedSorting, IntegratedPaging, IntegratedSelection, IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
    Grid, Table, TableHeaderRow, TableFilterRow, TableSelection, PagingPanel, GroupingPanel, TableGroupRow, Toolbar, SearchPanel
} from '@devexpress/dx-react-grid-bootstrap4';
import styled from 'styled-components';

const ReactGrid = styled.div`
    text-align: left;
`;

const TableComponent = ({ ...restProps }) => (
    <Table.Table
        {...restProps}
        className="table-striped"
    />
);

const TableRow = ({ row, history, ...restProps }) => {
    return (
        <Table.Row
            {...restProps}
            // eslint-disable-next-line no-alert
            onClick={() => {
                history.push('/cvReview/' + row.id);
            }}
            style={{
                cursor: 'pointer',
                textAlign: "left"
            }}
        />
    )
};

const DateTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={DateFormatter}
        {...props}
    />
);

const DateFormatter = ({ value }) => {
    var date = new Date(value);
    return date.toLocaleString();

};

// create a component
const CVReviewList = ({ cvReviewList, history }) => {
    return (
        <React.Fragment>
            <ReactGrid className="card">
                <Grid
                    rows={cvReviewList}
                    columns={[
                        { name: 'status', title: 'Status' },
                        { name: 'createdBy', title: 'Created By' },
                        { name: 'createdAt', title: 'Created At' },
                        { name: 'lastUpdatedBy', title: 'Last Updated By' },
                        { name: 'updatedAt', title: 'Last Updated At' },
                    ]}>
                    <FilteringState
                        defaultFilters={[{ columnName: 'createdBy', value: '' }]}
                    />
                    <SearchState />
                    <DateTypeProvider
                        for={['createdAt', 'updatedAt']}
                    />
                    <SortingState
                        defaultSorting={[{ columnName: 'createdAt', direction: 'desc' }]}
                    />
                    <GroupingState
                        defaultGrouping={[{ columnName: 'createdBy' }]}
                    />
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={10}
                    />
                    {/* <IntegratedGrouping /> */}
                    <IntegratedFiltering />
                    <IntegratedSorting />
                    <IntegratedPaging />

                    <Table
                        tableComponent={TableComponent}
                        rowComponent={props => <TableRow history={history} {...props} />}
                    />

                    <TableHeaderRow showSortingControls />
                    <TableFilterRow showFilterSelector={true} />
                    <PagingPanel />

                    {/* <TableGroupRow />
                    <Toolbar />
                    <SearchPanel />
                    <GroupingPanel showSortingControls={true} /> */}
                </Grid>
            </ReactGrid>
            <p className="hCenter" style={{ fontSize: "14px" }}>CV Reviews</p>
        </React.Fragment>
    );
};

CVReviewList.propTypes = {
    cvReviewList: PropTypes.array.isRequired
};
//make this component available to the app
export default CVReviewList;
