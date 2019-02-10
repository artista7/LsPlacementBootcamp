import * as types from "./actionTypes";
import { API, graphqlOperation } from 'aws-amplify';
import { listPricingPlans } from '../graphql/queries';

export function _listPricingPlans() {
    return function (dispatch) {
        return API.graphql(graphqlOperation(listPricingPlans)).then(response => {
            dispatch(_listPricingPlansSuccess(response.data.listPricingPlans.items));
        }).catch(response => {
            console.log(response);
        })
    }
}

export function _listPricingPlansSuccess(pricingPlans) {
    return { type: types.LIST_PRICINGPLANS_SUCCESS, pricingPlans };
}