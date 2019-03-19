import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function cvReviewReducer(state = initialState.cvReviews, action) {
    switch (action.type) {
        case types.CREATE_CVREVIEW_SUCCESS:
            return Object.assign([], [...state.filter(cvReview => cvReview.id !== action.cvReview.id), action.cvReview]);

        case types.LIST_CVREVIEWS_SUCCESS:
            return action.cvReviews;

        case types.UPDATE_CVREVIEW_SUCCESS:
            if (action.cvReview.hasOwnProperty('__typename')) {
                delete action.cvReview.__typename;
            }
            return Object.assign([], [...state.filter(cvReview => cvReview.id != action.cvReview.id), action.cvReview])

        default:
            return state;
    }
}