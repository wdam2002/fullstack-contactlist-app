# Simple Contactlist Management Application

This is a simple contactlist management application built using Flask for the backend and React for the frontend. It allows users to perform basic CRUD (Create, Read, Update, Delete) operations on contacts.

## Technologies Used

- **Backend:**
  - Flask - A micro web framework for Python.
  - Flask-SQLAlchemy - Extension for Flask that adds support for SQLAlchemy, an Object-Relational Mapping (ORM) tool.
  - Flask-CORS - Extension for handling Cross-Origin Resource Sharing (CORS) in Flask applications.
  - SQLite - A lightweight relational database management system.

- **Frontend:**
  - React - A JavaScript library for building user interfaces.
  - React Hooks - Used for state management and side effects in functional components.

## Backend Structure

- **`config.py`**: Configuration file for Flask app.
- **`models.py`**: Defines the Contact model using SQLAlchemy ORM.
- **`app.py`**: Main Flask application file containing routes for CRUD operations on contacts.

## Frontend Structure

- **`App.js`**: Main component for the React application, handles state and renders other components.
- **`ContactList.js`**: Component to display the list of contacts.
- **`ContactForm.js`**: Component for creating and updating contacts.
- **`App.css`**: Stylesheet for the React application.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/wdam2002/fullstack-contactlist-app.git
   ```

2. Run the Flask server:
   - Navigate to the **`backend`** directory
   - ```bash
     python3 main.py

3. Start the React development server:
   - Navigate to the **`frontend`** directory
   - ```bash
     npm run dev
   - Open your web browser and go to **`http://localhost:5173`** to view the application.
