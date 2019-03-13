import { combineReducers } from 'redux';
import accessibleAppModules from './accessibleAppModulesReducer';
import cvReviews from './cvReviewReducer';
import pricingPlans from './pricingPlanReducer';
import userInfo from './userReducer';

const rootReducer = combineReducers({
    accessibleAppModules,
    cvReviews,
    pricingPlans,
    userInfo
});

export default rootReducer;