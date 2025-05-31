import React from 'react';
import './TodoItem.css'; // We'll create this for item-specific styles

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span
        className="todo-text"
        onClick={() => onToggleComplete(todo.id)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onToggleComplete(todo.id)}
        aria-pressed={todo.completed}
      >
        {todo.task}
      </span>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="delete-btn"
        aria-label={`Delete task: ${todo.task}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
