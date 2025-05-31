document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoForm = document.getElementById('add-todo-form');
    const taskInput = document.getElementById('task-input');

    // Function to fetch and display todos
    async function fetchTodos() {
        try {
            const response = await fetch('/todos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            alert('Failed to fetch todos. Please try again later.');
        }
    }

    // Function to render todos in the list
    function renderTodos(todos) {
        todoList.innerHTML = ''; // Clear existing todos
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.task;
            li.dataset.id = todo.id;

            if (todo.completed) {
                li.classList.add('completed');
            }

            // Toggle completed status
            li.addEventListener('click', async () => {
                try {
                    const newCompletedStatus = !todo.completed;
                    const updateResponse = await fetch(`/todos/${todo.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ completed: newCompletedStatus }),
                    });
                    if (!updateResponse.ok) {
                        throw new Error(`HTTP error! status: ${updateResponse.status}`);
                    }
                    // Refresh the list
                    fetchTodos();
                } catch (error) {
                    console.error('Error updating todo:', error);
                    alert('Failed to update todo. Please try again.');
                }
            });

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', async (event) => {
                event.stopPropagation(); // Prevent li click event from firing
                try {
                    const deleteResponse = await fetch(`/todos/${todo.id}`, {
                        method: 'DELETE',
                    });
                    if (!deleteResponse.ok) {
                         throw new Error(`HTTP error! status: ${deleteResponse.status}`);
                    }
                    // Refresh the list
                    fetchTodos();
                } catch (error) {
                    console.error('Error deleting todo:', error);
                    alert('Failed to delete todo. Please try again.');
                }
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    // Event listener for adding a new todo
    addTodoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            try {
                const response = await fetch('/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task: taskText }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                taskInput.value = ''; // Clear input
                fetchTodos(); // Refresh the list
            } catch (error) {
                console.error('Error adding todo:', error);
                alert(`Failed to add todo: ${error.message}. Please try again.`);
            }
        }
    });

    // Initial fetch of todos
    fetchTodos();
});
