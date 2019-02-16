import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { NotificationManager } from 'react-notifications';

export function _listCvReviews(username) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listCvReviews)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items.filter(cvReview => cvReview.createdBy == username)));
        }).catch(response => {
            NotificationManager.error('Error loading reviews', 'Error', 2000);
            console.log(response);
        })
    }
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}