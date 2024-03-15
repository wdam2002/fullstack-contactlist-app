from config import db  # Import the database instance from the config module

# Contact model definition


class Contact(db.Model):
    # Define columns in the Contact table
    # Primary key column for unique identifier
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False,
                           nullable=False)  # Column for first name
    last_name = db.Column(db.String(80), unique=False,
                          nullable=False)  # Column for last name
    email = db.Column(db.String(120), unique=True,
                      nullable=False)  # Column for email address

    # Method to convert Contact object to JSON format
    def to_json(self):
        return {
            "id": self.id,  # Contact ID
            "firstName": self.first_name,  # First name
            "lastName": self.last_name,  # Last name
            "email": self.email,  # Email address
        }
