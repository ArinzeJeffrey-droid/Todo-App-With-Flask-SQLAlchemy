import React, {useEffect, useState} from 'react';
import axios from "axios"

const TestComponent = () => {
    const [data, setData] =  useState([])
    useEffect(() =>{
        axios.get("/getTodo").then(response => {
            const result = response.data.tasks
            console.log(result)
            setData(result)
            console.log(data);
        })
    },[])
    const reloadPage = () =>{
        window.location.reload()
    }
    const handleClick = (val) =>{
        axios.post("/deleteTodo",{val:val}).then(response => {
            console.log(response)
            reloadPage()
        })
        console.log(val)
    }
    return data.length ? (
        <div className="todo-task">
            <h1>Todo Task</h1>
            <ul>
                {data.map(todo => <li key={todo.id}>{todo.task} <button onClick={() => handleClick(todo.id)}>delete</button></li>)}
            </ul>
        </div>
    ): (
        <div>
            <h1>No Available Task</h1>
        </div>
    )
}

export default TestComponent;