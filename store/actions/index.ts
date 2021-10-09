import {ADD_TODO, DELETE_TODO} from "./types";

export const addTodoAction = (todo:any) => ({
    type: ADD_TODO,
    payload: todo,
})

export const deleteTodoAction = (todoId:any)=>({
    type: DELETE_TODO,
    payload:todoId,

})
