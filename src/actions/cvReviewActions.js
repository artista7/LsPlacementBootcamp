import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { getCvReview, listCvReviews } from '../graphql/queries';
import { createCvReview } from '../graphql/mutations';
import { NotificationManager } from 'react-notifications';

export function _createCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(createCvReview, { input: cvReview })).then(response => {
            NotificationManager.success('Submitted review successfully', 'Success', 2000);
            dispatch(_createCvReviewSuccess(response.data.createCvReview));
        }).catch(response => {
            NotificationManager.error('Error submitting review', 'Error', 2000);
            console.log(response);
        })
    }
}

export function _createCvReviewSuccess(cvReview) {
    return { type: types.CREATE_CVREVIEW_SUCCESS, cvReview };
}

export function _listCvReviews(userId) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(listCvReviews)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items.filter(cvReview => cvReview.createdBy == userId)));
        }).catch(response => {
            NotificationManager.error('Error loading reviews', 'Error', 2000);
            console.log(response);
        })
    }
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}