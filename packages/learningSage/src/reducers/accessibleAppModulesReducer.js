import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accessibleAppModulesReducer(state = initialState.accessibleAppModules, action) {
    switch (action.type) {
        case types.LOAD_APPMODULE_ACCESS:
            return action.accessibleAppModules;

        default:
            return state;
    }
}