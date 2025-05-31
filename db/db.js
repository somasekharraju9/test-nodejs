const { Pool } = require('pg');

// Default PostgreSQL connection details
// These would typically come from environment variables in a production app
const pool = new Pool({
  user: 'postgres', // Default user
  host: 'localhost', // Default host
  database: 'todo_db', // Default database, ensure this DB exists
  password: 'postgres', // Default password, change if yours is different
  port: 5432, // Default port
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database!');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export pool if direct access is needed, e.g. for transactions
};

// Test query to ensure connection (optional, can be removed)
// (async () => {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('PostgreSQL connection test successful:', res.rows[0]);
//   } catch (err) {
//     console.error('Error connecting to PostgreSQL or running test query:', err.stack);
//     console.log('Please ensure PostgreSQL is running and the database "todo_db" exists, and the credentials are correct.');
//   }
// })();
