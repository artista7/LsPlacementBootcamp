import * as types from "./actionTypes";

export function _loadUserInfo(userInfo) {
    return function (dispatch) {
        dispatch({ type: types.LOAD_USER_INFO, userInfo })
    }
}