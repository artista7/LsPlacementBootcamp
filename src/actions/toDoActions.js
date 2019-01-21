import * as types from "./actionTypes";
import apiService from "../service/apiService";

export function createTodo(toDo) {
    return function (dispatch) {
        return apiService.createTodo(toDo).then(toDos => {
            dispatch(createToSuccess(toDo));
        }).catch(error => {
            console.log(error);
        })
    }
}

export function createToSuccess(toDo) {
    return { type: types.CREATE_TODO_SUCCESS, toDo }
}

export function listTodos() {
    return function (dispatch) {
        return apiService.listTodos().then(response => {
            dispatch(loadTodosSuccess(response.data.listTodos.items))
        })
    }
}

export function loadTodosSuccess(toDos) {
    return { type: types.LIST_TODOS_SUCCESS, toDos };
}