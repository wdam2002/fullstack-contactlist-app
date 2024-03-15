from flask import request, jsonify
from config import app, db
from models import Contact


# Route to get all contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()  # Query all contacts from the database
    # Convert contacts to JSON format
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    # Return JSON response containing contacts
    return jsonify({"contacts": json_contacts})


# Route to create a new contact
@app.route("/create_contact", methods=["POST"])
def create_contact():
    # Retrieve data from request JSON
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    # Validate data
    if not first_name or not last_name or not email:
        return jsonify({"message": "You must include a first name, last name and email"}), 400

    # Create a new Contact object and add it to the database
    new_contact = Contact(first_name=first_name,
                          last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        # Return error message if an exception occurs
        return jsonify({"message": str(e)}), 400

    # Return success message
    return jsonify({"message": "Contact created!"}), 201


# Route to update an existing contact
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    # Retrieve the contact by user_id
    contact = Contact.query.get(user_id)

    # Check if contact exists
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    # Update contact data with request JSON
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    # Commit changes to the database
    db.session.commit()

    # Return success message
    return jsonify({"message": "Contact updated."}), 200


# Route to delete a contact
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    # Retrieve the contact by user_id
    contact = Contact.query.get(user_id)

    # Check if contact exists
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    # Delete the contact from the database
    db.session.delete(contact)
    db.session.commit()

    # Return success message
    return jsonify({"message": "Contact deleted!"}), 200


# Run the Flask application
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create database tables if they don't exist

    app.run(debug=True)  # Run the Flask app in debug mode
