import React,{useState} from "react";


export const TodoForm = ({addTodo, setFilter}) => {
    
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    

    const handleSubmit = event  => {
        event.preventDefault();

        // validation on input
        if(value.trim() === ""){
            setError("Required");
            return;
        }
        

        addTodo(value);

        setValue("");
        setError("");
    }
    
    
    return(
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text" className="todo-input"
            value={value}
            placeholder="What is today's task?" 
            onChange={(event)=> setValue(event.target.value)}
            
            />
            {error && <p style={{color:"red", fontSize:"14px"}}>{error}</p>}
            <button type="submit" className="todo-btn">Add task</button>
           
        
    <select  onChange={(event)=> setFilter(event.target.value)} className="filterbtn">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="incomplete">Incomplete</option>
    </select>
         
        </form>
    )

}
