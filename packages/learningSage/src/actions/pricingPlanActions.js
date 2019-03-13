import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';

export function _listPricingPlans() {
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listPricingPlans)).then(response => {
            dispatch(_listPricingPlansSuccess(response.data.listPricingPlans.items));
        }).catch(response => {
            console.log(response);
        })
    }
}

export function _listPricingPlansSuccess(pricingPlans) {
    return { type: types.LIST_PRICINGPLANS_SUCCESS, pricingPlans };
}