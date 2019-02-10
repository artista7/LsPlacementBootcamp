import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.userInfo, action) {
    switch (action.type) {
        case types.LOAD_USER_INFO:
            return Object.assign({}, action.userInfo)

        case types.UPDATE_USER_INFO:
            debugger;
            return Object.assign({}, action.userInfo)

        default:
            return state;
    }
}