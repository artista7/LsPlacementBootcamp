import { combineReducers } from 'redux';
import cvReviewReducer from './cvReviewReducer';
import userInfoReducer from './userReducer';

const rootReducer = combineReducers({
    cvReviewReducer,
    userInfoReducer
});

export default rootReducer;