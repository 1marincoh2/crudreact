import {ADD_TODO,DELETE_TODO} from "../actions/types"


const todoReducer= (state:any,action:any) =>{
    switch (action.type){
        case ADD_TODO:
            return{
                ...state,
                todos:[...state.todos,action.payload]
            };
        case DELETE_TODO:
            return{

                ...state,
                todos:state.todos.filter((todo:any)=> todo.id !== action.payload)
            };
        default:
            return state;
    }



}
export default todoReducer;
