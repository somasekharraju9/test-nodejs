const express = require('express');
const path = require('path'); // Import path module
const db = require('./db/db');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// --- API Endpoints (from previous step) ---
// GET /todos
app.get('/todos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching todos:', err.stack);
    res.status(500).json({ error: 'Internal server error while fetching todos' });
  }
});

// POST /todos
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  try {
    const { rows } = await db.query(
      'INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *',
      [task, false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding todo:', err.stack);
    res.status(500).json({ error: 'Internal server error while adding todo' });
  }
});

// PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  if (task === undefined && completed === undefined) {
    return res.status(400).json({ error: 'Task or completed status is required for update' });
  }
  if (completed !== undefined && typeof completed !== 'boolean') {
     return res.status(400).json({ error: 'Completed status must be a boolean' });
  }
  try {
    let queryText = 'UPDATE todos SET ';
    const queryParams = [];
    let paramIndex = 1;
    if (task !== undefined) {
      queryText += `task = $${paramIndex++} `;
      queryParams.push(task);
    }
    if (completed !== undefined) {
      if (queryParams.length > 0) queryText += ', ';
      queryText += `completed = $${paramIndex++} `;
      queryParams.push(completed);
    }
    queryText += `WHERE id = $${paramIndex} RETURNING *`;
    queryParams.push(parseInt(id));
    const { rows } = await db.query(queryText, queryParams);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(`Error updating todo ${id}:`, err.stack);
    res.status(500).json({ error: 'Internal server error while updating todo' });
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query('DELETE FROM todos WHERE id = $1', [parseInt(id)]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(`Error deleting todo ${id}:`, err.stack);
    res.status(500).json({ error: 'Internal server error while deleting todo' });
  }
});

// --- Serving React App ---
// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  if (!req.path.startsWith('/todos')) { // Avoid serving index.html for API calls if they somehow miss above routes
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  } else {
    // If an API path was somehow not caught by API routers but starts with /todos
    res.status(404).send("API endpoint not found");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Todo app server listening on port ${port}`);
  console.log('API endpoints are available under /todos.');
  console.log('React frontend is served from client/build. Run "npm run build" in the "client" directory if you haven\'t already.');
  console.log('Ensure PostgreSQL is running and configured, and the "todos" table exists in "todo_db".');
});
