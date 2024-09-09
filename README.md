# Task Management API

This is a Task Management API developed using Node.js and PostgreSQL. The API allows you to create, read, update, and delete tasks.
Project Structure

## Project Structure
    src/
        controllers/: API controllers
        models/: Models for interacting with the database
        router.js: Route definitions
        app.js: Express configuration
    database/: Scripts for setting up the database and tables
    package.json: Package manager and project scripts

## Requirements

    Node.js (version 16 or higher)
    PostgreSQL

## Installation

1. Clone the repository:
    ``bash
        git clone https://github.com/josevitorrodriguess/api-node.git
    
    ``bash
     cd <api-node>

2. Install Dependencies:
    ``bash
        npm install

3. Create database:
    ``bash
        CREATE DATABASE IF NOT EXISTS todolist;
        CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
        );
4. Configure the database.Create a .env file in the root of the project with the following content:
    ``bash
        DB_USER=your_username
        DB_HOST=localhost
        DB_NAME=database_name
        DB_PASSWORD=your_password
        DB_PORT=5432

5. Run the api:
    ``bash
    npm run dev


## API Endpoints

###   Get ALl Tasks
        Method:GET
        URL:/tasks
        Description:Returns a list of all tasks

###   Create a New Task
        Method:POST
        URL:/tasks
        Description:Create a new task
        Request body:
        ``bash
            {
            "title": "Task Title",
            "description": "Task Description",
            "status": "incomplete"
            }
        
###   Get Task by ID
        Method:GET
        URL:/tasks/:id
        Description:Returns a task by ID

###   Delete Task by ID
        Method:DELETE
        URL:/tasks/:id
        Description:Deletes a task by its ID.


## Running the application
    start server with:
    ``bash
        npm run dev

The server will run on http://localhost:3000 by default. You can use tools like Postman or cURL to test the endpoints.