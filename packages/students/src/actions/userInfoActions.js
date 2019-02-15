import { API, graphqlOperation } from 'aws-amplify';
import { queries } from 'awsls';
import { mutations } from 'awsls';
import * as types from "./actionTypes";

export function _loadUserInfo(username) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(queries.getUser, { id: username })).then(response => {
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

export function _updateUser(userInfo) {
    return function (dispatch) {
        return API.graphql(graphqlOperation(mutations.updateUser, { input: userInfo })).then(response => {
            console.log("updated user info");
            dispatch(_updateUserSuccess(response.data.updateUser));
        }).catch(response => {
            console.log(response);
        })
    }
}

export function _updateUserSuccess(userInfo) {
    return { type: types.UPDATE_USER_INFO, userInfo };
}