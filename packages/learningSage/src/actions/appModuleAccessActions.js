import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { mutations } from 'awsls';
import * as types from "./actionTypes";

export function _loadAppModuleAccess(group) {
    var queryObj = {
        filter: {
            group: {
                eq: group
            }
        },
        limit: 1000
    }

    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listAppModuleAccesss, queryObj)).then(response => {
            var accessibleAppModules = response.data.listAppModuleAccesss.items.length > 0 ? response.data.listAppModuleAccesss.items[0].appModules.split(',') : [];
            dispatch(_loadAppModuleAccessSuccess(accessibleAppModules));
        }).catch(response => {
            console.log(response);
            throw (response.errors);
        });
    }
}

export function _loadAppModuleAccessSuccess(accessibleAppModules) {
    return function (dispatch) {
        dispatch({ type: types.LOAD_APPMODULE_ACCESS, accessibleAppModules })
    }
}