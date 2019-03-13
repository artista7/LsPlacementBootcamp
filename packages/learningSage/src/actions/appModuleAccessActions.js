import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { mutations } from 'awsls';
import * as types from "./actionTypes";

export function _loadAppModuleAccess(group) {
    var filterObj = {
        filter: {
            group: {
                eq: group
            }
        }
    }

    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.listAppModuleAccesss, filterObj)).then(response => {
            var accessibleAppModules = response.data.listAppModuleAccesss.items.length > 0 ? response.data.listAppModuleAccesss.items[0].appModules.split(',') : [];
            dispatch(_loadAppModuleAccessSuccess(accessibleAppModules));
        }).catch(response => {
            console.log(response);
        });
    }
}

export function _loadAppModuleAccessSuccess(accessibleAppModules) {
    return function (dispatch) {
        dispatch({ type: types.LOAD_APPMODULE_ACCESS, accessibleAppModules })
    }
}