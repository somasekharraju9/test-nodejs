import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const API_URL = '/todos'; // Assuming the backend is served on the same domain

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // For loading state

  // Fetch initial todos
  useEffect(() => {
    const fetchInitialTodos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (e) {
        console.error('Error fetching todos:', e);
        setError(`Failed to fetch todos: ${e.message}. Ensure the backend server is running and accessible, and that the 'todo_db' database with a 'todos' table has been initialized.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialTodos();
  }, []);

  const addTodo = async (taskText) => {
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to add todo. Please try again.' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (e) {
      console.error('Error adding todo:', e);
      setError(`Failed to add todo: ${e.message}`);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to update todo. Please try again.' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const updatedTodo = await response.json();
      setTodos(
        todos.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (e) {
      console.error('Error toggling todo completion:', e);
      setError(`Failed to update todo: ${e.message}`);
    }
  };

  const deleteTodo = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Todo not found on server.');
        }
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error('Error deleting todo:', e);
      setError(`Failed to delete todo: ${e.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List - React Version</h1>
      </header>
      <main>
        {error && <p className="error-message">{error}</p>}
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDeleteTodo={deleteTodo}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
