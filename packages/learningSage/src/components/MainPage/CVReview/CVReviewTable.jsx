//import libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    IntegratedSelection,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';

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
const CVReviewTable = ({ cvReviewList, history }) => {
    return (
        <React.Fragment>
            <div className="card">
                <Grid
                    rows={cvReviewList}
                    columns={[
                        { name: 'status', title: 'Status' },
                        { name: 'createdBy', title: 'Created By' },
                        { name: 'createdAt', title: 'Created At' },
                        { name: 'lastUpdatedBy', title: 'Updated By' },
                        { name: 'updatedAt', title: 'Last Updated At' },
                    ]}>
                    <DateTypeProvider
                        for={['createdAt', 'updatedAt']}
                    />
                    <SortingState
                        defaultSorting={[{ columnName: 'createdAt', direction: 'desc' }]}
                    />
                    <PagingState
                        defaultCurrentPage={0}
                        pageSize={10}
                    />
                    <IntegratedSorting />
                    <IntegratedPaging />
                    <Table
                        tableComponent={TableComponent}
                        rowComponent={props => <TableRow history={history} {...props} />}
                    />
                    <TableHeaderRow showSortingControls />
                    <PagingPanel />
                </Grid>
            </div>
            <p className="hCenter" style={{ fontSize: "14px" }}>CV Reviews</p>
        </React.Fragment>
    );
};

CVReviewTable.propTypes = {
    cvReviewList: PropTypes.array.isRequired
};
//make this component available to the app
export default CVReviewTable;
