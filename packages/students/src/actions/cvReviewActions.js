import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { mutations } from 'awsls';
import { NotificationManager } from 'react-notifications';

export function _createCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(mutations.createCvReview, { input: cvReview })).then(response => {
            NotificationManager.success('Submitted cv successfully', '', 2000);
            dispatch(_createCvReviewSuccess(response.data.createCvReview));
        }).catch(response => {
            NotificationManager.error('Error submitting review', '', 2000);
            console.log(response);
        })
    }
}

export function _createCvReviewSuccess(cvReview) {
    return { type: types.CREATE_CVREVIEW_SUCCESS, cvReview };
}

export function _listCvReviews(username) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listCvReviews)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items.filter(cvReview => cvReview.createdBy == username)));
        }).catch(response => {
            NotificationManager.error('Error loading reviews', '', 2000);
            console.log(response);
        })
    }
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}