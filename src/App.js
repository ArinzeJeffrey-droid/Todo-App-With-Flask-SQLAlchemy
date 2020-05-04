import React, {useState} from 'react';
import axios from "axios"
import TestComponent from './components/TestComponent';


const App = () => {
    const [todo, setTodo] = useState('')
    const addTodo = (task) =>{
        setTodo(task)
        console.log(todo)
        setTodo('')
    }
    const handleSubmit = (e) =>{
        // e.preventDefault()
        // addTodo(todo)
        axios.post("/addTodo",{todo}).then(response => {
            console.log(response)
        })
        setTodo("")
    }
    return (
        <div>
            <form className="add-todo" onSubmit={handleSubmit} action="">
            <h1>Todo App</h1>
                <input type="text" required value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter Todo....."/>
                <button>Add</button>
            </form>
            <TestComponent/>
        </div>
    );
}

export default App
