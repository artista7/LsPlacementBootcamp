import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function cvReviewReducer(state = initialState.cvReviews, action) {
    switch (action.type) {
        case types.CREATE_CVREVIEW_SUCCESS:
            return Object.assign([], [...state.filter(cvReview => cvReview.id !== action.cvReview.id), action.cvReview])

        case types.LIST_CVREVIEWS_SUCCESS:
            return Object.assign({}, state, { cvReviews: action.cvReviews })

        default:
            return state;
    }
}