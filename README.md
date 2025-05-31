# Simple Node.js Todo Application

This is a basic Todo application built with Node.js, Express.js, HTML, CSS, and vanilla JavaScript. It uses in-memory storage for the todos.

## Features

- View a list of tasks.
- Add new tasks.
- Mark tasks as completed (click on the task text).
- Delete tasks.

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.

## Setup and Running the Application

1.  **Clone the repository (or download the files):**
    ```bash
    # If you have git installed
    # git clone <repository_url>
    # cd <repository_directory>
    ```
    If you downloaded the files, navigate to the project directory in your terminal.

2.  **Install dependencies:**
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```
    This command will install Express.js, which is listed in the `package.json` file.

3.  **Start the server:**
    After the dependencies are installed, run the following command:
    ```bash
    node server.js
    ```

4.  **Open the application in your browser:**
    Once the server is running, you will see a message in the console like:
    `Todo app server listening at http://localhost:3000`
    Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

The application uses the following API endpoints:

- `GET /todos`: Get all todos.
- `POST /todos`: Add a new todo.
  - Request body: `{ "task": "Your task description" }`
- `PUT /todos/:id`: Update a todo's completed status.
  - Request body: `{ "completed": true/false }`
- `DELETE /todos/:id`: Delete a todo.

## File Structure

- `server.js`: The main backend file with the Express.js server and API logic.
- `package.json`: Defines project metadata and dependencies.
- `package-lock.json`: Records the exact versions of dependencies.
- `public/`: Directory for static frontend files.
  - `public/index.html`: The main HTML file for the user interface.
  - `public/script.js`: Frontend JavaScript for interactivity and API communication.
  - `public/style.css`: CSS for styling the application.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore (e.g., `node_modules/`).
- `README.md`: This file, providing information about the application.
