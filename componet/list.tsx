import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {deleteTodoAction} from "../store/actions";
import {Button} from "@mui/material";

const List = () => {
    // @ts-ignore
    const todos =useSelector(state => state.todos)
    const dispatch =useDispatch()
    return (
        <div>
            {todos.map((todo:any) =>{
                return(
                    <div key={todo.id}>
                      <p>{todo.name} {todo.complete && ':rocket'}</p>
                        {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                   <Button onClick={()=>dispatch(deleteTodoAction(todo.id))}>
                       delete
                   </Button>
                    </div>
                )
            })}
        </div>
    );
};

export default List;
