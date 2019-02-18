//import libraries
import React from 'react';
import PropTypes from 'prop-types';
import * as cvReviewActions from '../../../actions/cvReviewActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    IntegratedSelection,
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
                cursor: 'pointer'
            }}
        />
    )
};


// create a component
class CVReviewList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isInitializing: false
        }

        this.redirectToRoute = this.redirectToRoute.bind(this);
        this.setInitializing = this.setInitializing.bind(this);
    }

    redirectToRoute(route) {
        this.props.history.push(route);
    }

    setInitializing(bool) {
        this.setState({
            isInitializing: bool == true ? true : false
        })
    }

    render() {
        const { cvReviewList, history } = this.props;
        return (
            <div className="card">
                {cvReviewList.length > 0 && <Grid
                    rows={this.props.cvReviewList}
                    columns={[
                        { name: 'createdBy', title: 'Uploaded By' },
                        { name: 'status', title: 'Status' },
                        { name: 'lastUpdatedBy', title: 'Last updated by' },
                        { name: 'reviewedBy', title: 'Reviewed By' },
                        // { name: 'createdAt', title: 'Created At' },
                    ]}>
                    <SortingState
                        defaultSorting={[{ columnName: 'createdBy', direction: 'asc' }]}
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
                </Grid>}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        cvReviewList: state.cvReviews || []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        cvReviewActions: bindActionCreators(cvReviewActions, dispatch)
    };
}
CVReviewList.propTypes = {
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(CVReviewList);
