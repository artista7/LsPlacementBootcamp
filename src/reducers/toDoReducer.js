import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function toDoReducer(state = initialState, action) {
    switch (action.type) {
        case types.CREATE_TODO_SUCCESS:
            return Object.assign({}, state, { toDos: [...state.toDos.filter(toDo => toDo.id !== action.toDo.id), action.toDo] })

        case types.LIST_TODOS_SUCCESS:
            return Object.assign({}, state, { toDos: action.toDos })

        default:
            return state;
    }
}