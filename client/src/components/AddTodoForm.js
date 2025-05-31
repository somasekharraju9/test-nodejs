import React, { useState } from 'react';

function AddTodoForm({ onAddTodo }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTodo(taskText);
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
        aria-label="New task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTodoForm;
