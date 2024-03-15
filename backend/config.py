from flask import Flask  # Import Flask class from flask module
# Import SQLAlchemy class from flask_sqlalchemy module
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS class from flask_cors module

# Create a Flask application instance with the name of the current module
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS) for the Flask app

# Configure the Flask app to use SQLite database named "mydatabase.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# Disable modification tracking for SQLAlchemy to suppress warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)  # Create an instance of SQLAlchemy bound to the Flask app
