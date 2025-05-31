-- DDL for creating the todos table

-- Drop the table if it already exists (optional, for easy reset during development)
-- DROP TABLE IF EXISTS todos;

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- You can add some initial DML (sample data) here if needed, for example:
-- INSERT INTO todos (task) VALUES ('Set up PostgreSQL');
-- INSERT INTO todos (task, completed) VALUES ('Learn about DDL and DML', TRUE);

-- Grant privileges if necessary, depending on your PostgreSQL setup
-- For example, if your app user is different from the table owner:
-- GRANT ALL PRIVILEGES ON TABLE todos TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE todos_id_seq TO your_app_user;
