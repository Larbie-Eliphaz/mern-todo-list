import './App.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem.jsx";
import CreateTodo from "./CreateTodo.jsx";
const BASE_URL = "https://mern-todo-list-4bvv.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = async (newTodo) => {
    await axios.post(`${BASE_URL}/api/addtodo`, newTodo);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/findall`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onToggle = async (id) => {
    await axios
      .put(`${BASE_URL}/api/updatetodo`, { id })
      .then((res) => {
        fetchData();
        console.log(res.data);
      });
  };
  const deleteTodo = async (id) => {
    await axios
      .delete(`${BASE_URL}/api/deletetodo`, { data: { _id: id } })
      .then((res) => {
        fetchData();
        console.log(res.data);
      });
  };
  return (
    <div className='todo-container'>
      <h1 className='header'>Todo List</h1>
      <CreateTodo addTodo={addTodo} getTodos={fetchData} />
      {todos.length ===0? <div className='todo-item'>No Task Found</div> : todos.map((todo) => (
        <TodoItem
          key={todo._id}
          title={todo.title}
          isDone={todo.isDone}
          id={todo._id}
          onToggle={onToggle}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default App;
