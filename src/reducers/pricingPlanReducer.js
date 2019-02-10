import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.pricingPlans, action) {
    switch (action.type) {
        case types.LIST_PRICINGPLANS_SUCCESS:
            return action.pricingPlans

        default:
            return state;
    }
}