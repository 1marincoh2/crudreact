import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {addTodoAction} from "../store/actions";

const AddTodo = () => {
    const [todo, setTodo]=useState('');
    const dispatch=useDispatch();
    // @ts-ignore
    const todos=useSelector(state => state.todos);

    const addTodo =()=>{
        const newTodo={
            id:todo.length,
            name:todo,
            complete:false
        };
        dispatch(addTodoAction(newTodo));
        setTodo('');
    }
    return (
        <div>
            <input type='text' value={todo} onChange={(e)=>setTodo(e.target.value)}/>
           <Button onClick={()=>addTodo()} > enviar</Button>
        </div>
    );
};

export default AddTodo;
