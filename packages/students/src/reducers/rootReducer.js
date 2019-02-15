import { combineReducers } from 'redux';
import cvReviews from './cvReviewReducer';
import userInfo from './userReducer';
import pricingPlans from './pricingPlanReducer';

const rootReducer = combineReducers({
    cvReviews,
    pricingPlans,
    userInfo
});

export default rootReducer;