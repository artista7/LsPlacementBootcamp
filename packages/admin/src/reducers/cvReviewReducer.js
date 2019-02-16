import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function cvReviewReducer(state = initialState.cvReviews, action) {
    switch (action.type) {
        case types.LIST_CVREVIEWS_SUCCESS:
            return action.cvReviews;

        default:
            return state;
    }
}