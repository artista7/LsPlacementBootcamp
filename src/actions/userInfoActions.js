import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import * as types from "./actionTypes";

export function _loadUserInfo(username) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(getUser, { id: username })).then(response => {
            dispatch(_loadUserInfoSuccess(response.data.getUser));
        }).catch(response => {
            console.log(response);
        });
    }
}

export function _loadUserInfoSuccess(userInfo) {
    return function (dispatch) {
        dispatch({ type: types.LOAD_USER_INFO, userInfo })
    }
}