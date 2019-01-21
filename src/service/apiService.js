import { API, graphqlOperation } from 'aws-amplify';
import { getTodo, listTodos } from '../graphql/queries';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';

class ApiService {
    static createTodo(toDo) {
        return API.graphql(graphqlOperation(createTodo, { input: toDo }))
    }

    static listTodos() {
        return API.graphql(graphqlOperation(listTodos))
    }
}

export default ApiService;