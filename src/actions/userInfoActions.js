import * as types from "./actionTypes";

export function _updateUserInfo(userInfo) {
    return function (dispatch) {
        dispatch({ type: types.UPDATE_USER_INFO, userInfo })
    }
}