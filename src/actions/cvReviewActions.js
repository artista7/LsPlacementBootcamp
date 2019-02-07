import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { getCvReview, listCvReviews } from '../graphql/queries';
import { createCvReview } from '../graphql/mutations';

export function _createCvReview(cvReview) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(createCvReview, { input: cvReview })).then(response => {
            dispatch(_createCvReviewSuccess(response.data.createCvReview));
        }).catch(error => {
            console.log(error);
        })
    }
}

export function _createCvReviewSuccess(cvReview) {
    return { type: types.CREATE_CVREVIEW_SUCCESS, cvReview }
}

export function _listCvReviews() {
    return function (dispatch) {
        return API.graphql(graphqlOperation(listCvReviews)).then(response => {
            dispatch(_listCvReviewsSuccess(response.data.listCvReviews.items))
        })
    }
}

export function _listCvReviewsSuccess(cvReviews) {
    return { type: types.LIST_CVREVIEWS_SUCCESS, cvReviews };
}