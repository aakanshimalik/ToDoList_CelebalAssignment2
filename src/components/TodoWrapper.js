import React,{useState, useEffect} from "react";
import { TodoForm } from "./TodoFrom";
import {v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState(() =>{
        const localtodos = localStorage.getItem("todos")
        return localtodos ? JSON.parse(localtodos): []
    });

    // local storage integration
    useEffect(() =>{
        if(todos.length > 0){
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    }, [todos])


    // filter option in todo list
    const [filter, setFilter] = useState('all');

    const filterTodos = todos.filter(todo => {
        if( filter === "completed")
            return todo.completed;
        if(filter === "incomplete")
            return !todo.completed;
        return true;
    });
    
    // sorting option
    const sortedTodos = [...filterTodos].sort((a,b)=>Number(a.completed)-Number(b.completed));

    // add item 
    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo,
            completed: false, isEditing: false
        }])
        console.log(todos)
    }
    
    // mark as done
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    // Delete option
    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // edit 
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing}: todo))
    }
    const editTask = (task, id)=> {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    }
    
 
    return(
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>


            <TodoForm addTodo={addTodo}
            setFilter={setFilter}/>
            {sortedTodos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo}/>
                ) : (
                    <Todo task={todo} key={index} 
                    toggleComplete= {toggleComplete}
                    deleteTodo={deleteTodo} editTodo={editTodo}/>
                ) 
                
            ))}
            
        </div>
    )
}