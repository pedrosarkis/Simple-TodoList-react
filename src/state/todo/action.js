import * as todoTypes from './types';

export function addTodo(title) {
    return {
        type: todoTypes.ADD_TODO,
        payload: {
            title
        }
    }
}

export function toggleTodoStatus(id, completed) {
    return {
        type: todoTypes.TOGGLE_TODO_STATUS,
        payload: {
            id,
            completed
        }
    }
}

export function toggleTodoTitle(id, title) {
    return {
        type: todoTypes.TOGGLE_TODO_TITLE,
        payload: {
            id, 
            title
        }
    }
}

export function removeTodo(id) {
    return {
        type: todoTypes.REMOVE_TODO,
        payload: {
            id
        }
    }
}