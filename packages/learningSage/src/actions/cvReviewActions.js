import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { mutations } from 'awsls';
import { subscriptions } from 'awsls';
import { NotificationManager } from 'react-notifications';
import * as constants from '../constants/constants';

//CRUD queries and mutations
export function _createCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(mutations.createCvReview, { input: cvReview })).then(response => {
            NotificationManager.success('Cv will be reviewed shortly', 'Cv Submitted', 6000);
        }).catch(response => {
            NotificationManager.error('Error submitting review', '', 2000);
            console.log(response);
        })
    }
}

export function _listCvReviews(group, username) {
    const queryObj = group == constants.groups.STUDENT ? {
        filter: {
            createdBy: {
                eq: username
            }
        },
        limit: 1000
    } : {
            limit: 1000
        };
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listCvReviews, queryObj)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items));
        }).catch(response => {
            NotificationManager.error('Error loading reviews', '', 2000);
            console.log(response);
        })
    }
}

export function _updateCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(mutations.updateCvReview, { input: cvReview })).then(response => {
        }).catch(response => {
            NotificationManager.error('Error submitting review', '', 2000);
            console.log(response);
        })
    }
}

//ActionCreators
export function _createCvReviewSuccess(cvReview) {
    return { type: types.CREATE_CVREVIEW_SUCCESS, cvReview };
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}

export function _updateCvReviewSuccess(cvReview) {
    return { type: types.UPDATE_CVREVIEW_SUCCESS, cvReview };
}
