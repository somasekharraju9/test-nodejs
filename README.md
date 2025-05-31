# Node.js Todo Application with React Frontend and PostgreSQL Backend

This is a Todo application built with:
- **Backend**: Node.js, Express.js, PostgreSQL (using `pg` library)
- **Frontend**: React (created with `create-react-app`)

## Features

- View a list of tasks.
- Add new tasks.
- Mark tasks as completed by clicking on them.
- Delete tasks.
- Data is persisted in a PostgreSQL database.

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.
- PostgreSQL server installed and running.

## Database Setup

1.  **Ensure PostgreSQL is running.**
2.  **Create a database**: It's recommended to create a dedicated database for this application. The application is configured by default to use a database named `todo_db`.
    ```sql
    -- Example using psql:
    CREATE DATABASE todo_db;
    ```
3.  **Connect to your new database** (e.g., `\c todo_db` in `psql`).
4.  **Create the `todos` table**: Execute the DDL commands found in `db/init.sql` against your database.
    ```bash
    # Example using psql, from the project root directory:
    psql -U your_postgres_user -d todo_db -a -f db/init.sql
    ```
    You might need to enter your PostgreSQL user's password.
    The default connection parameters in `db/db.js` are:
    - User: `postgres`
    - Host: `localhost`
    - Database: `todo_db`
    - Password: `postgres` (or your user's password)
    - Port: `5432`
    If your setup differs, please update `db/db.js` or use environment variables (not explicitly configured in this version, but a good practice for production).

## Application Setup and Running

There are two main parts to this application: the backend server and the frontend React client.

**1. Backend Server Setup & Start:**

   - Navigate to the project's root directory.
   - **Install dependencies**:
     ```bash
     npm install
     ```
   - **Start the server**:
     ```bash
     node server.js
     ```
   - The server will start (by default on `http://localhost:3000`). It serves the API and, in production, the React frontend.

**2. Frontend Client Setup & Development (Optional, for development):**

   If you want to run the React development server (for features like hot-reloading):
   - Navigate to the `client` directory:
     ```bash
     cd client
     ```
   - **Install frontend dependencies**:
     ```bash
     npm install
     ```
   - **Start the React development server**:
     ```bash
     `npm start`
     ```
   - This will typically open the application in your browser at `http://localhost:3001` (or another available port if 3000 is in use by the backend and proxying isn't set up in CRA for this project). The React dev server will make API calls to the backend server running on port 3000 (or as configured).
     *Note: For `npm start` in the client to correctly proxy API requests to the backend server at `localhost:3000`, you might need to add a `"proxy": "http://localhost:3000"` line to `client/package.json`.* This has not been added automatically.

**Accessing the Application (Production Mode - after building the client):**

1.  **Build the React application:**
    - Navigate to the `client` directory:
      ```bash
      cd client
      ```
    - Run the build script:
      ```bash
      npm run build
      ```
    - This creates a `build` folder inside the `client` directory with the optimized static assets.

2.  **Start the backend server:**
    - Navigate back to the project root directory (if you were in `client`).
    - Run:
      ```bash
      node server.js
      ```
    - The Express server is configured to serve the static files from `client/build`.

3.  **Open the application in your browser:**
    - Navigate to `http://localhost:3000` (or the port your server is running on).

## API Endpoints

The backend server provides the following API endpoints under the `/todos` path:

- `GET /todos`: Get all todos.
- `POST /todos`: Add a new todo.
  - Request body: `{ "task": "Your task description" }`
- `PUT /todos/:id`: Update a todo's task text or completed status.
  - Request body (example for completion): `{ "completed": true }`
  - Request body (example for task text): `{ "task": "Updated task text" }`
- `DELETE /todos/:id`: Delete a todo.

## File Structure Highlights

- `server.js`: The main backend Express.js server, API logic, and React app serving.
- `package.json`: Root project dependencies (Express, pg).
- `db/`: Directory for database-related files.
  - `db/db.js`: PostgreSQL connection pool setup.
  - `db/init.sql`: DDL for creating the `todos` table.
- `client/`: Directory for the React frontend application.
  - `client/package.json`: Frontend dependencies and scripts (React, react-scripts).
  - `client/src/App.js`: Main React application component.
  - `client/src/components/`: Directory for individual React components.
  - `client/build/`: (After running `npm run build` in `client/`) Contains the static build of the React app.
- `.gitignore`: Specifies intentionally untracked files.
- `README.md`: This file.
