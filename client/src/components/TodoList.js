import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggleComplete, onDeleteTodo, isLoading }) { // Added isLoading prop
  if (isLoading) {
    return <p className="loading-message">Loading todos...</p>;
  }

  if (!todos || todos.length === 0) {
    return <p className="empty-message">No todos yet. Add some!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
