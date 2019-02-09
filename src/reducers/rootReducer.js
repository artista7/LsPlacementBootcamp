import { combineReducers } from 'redux';
import cvReviews from './cvReviewReducer';
import userInfo from './userReducer';

const rootReducer = combineReducers({
    cvReviews,
    userInfo
});

export default rootReducer;