import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function userReducer(state = initialState.userInfo, action) {
    switch (action.type) {
        case types.UPDATE_USER_INFO:
            return Object.assign({}, state, { userInfo: action.userInfo })

        default:
            return state;
    }
}