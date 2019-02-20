import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { queries, mutations } from 'awsls';
import { NotificationManager } from 'react-notifications';

//CRUD
export function _listCvReviews() {
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listCvReviews)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items));
        }).catch(response => {
            NotificationManager.error('Error loading reviews', '', 2000);
            console.log(response);
        })
    }
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}

export function _updateCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(mutations.updateCvReview, { input: cvReview })).then(response => {
            dispatch(_updateCvReviewSuccess(response.data.updateCvReview));
        }).catch(response => {
            NotificationManager.error('Error submitting review', '', 2000);
            console.log(response);
        })
    }
}

export function _updateCvReviewSuccess(cvReview) {
    return { type: types.UPDATE_CVREVIEW_SUCCESS, cvReview };
}