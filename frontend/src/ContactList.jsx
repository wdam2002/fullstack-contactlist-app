import React from "react";

// ContactList component
const ContactList = ({ contacts, updateContact, updateCallback }) => {
  // Function to handle deletion of a contact
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      // Send DELETE request to backend to delete contact by ID
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      // If deletion is successful, trigger updateCallback to update parent component
      if (response.status === 200) {
        updateCallback();
      } else {
        // If deletion fails, log error
        console.error("Failed to delete contact");
      }
    } catch (error) {
      // If an error occurs during deletion, alert the error
      alert(error);
    }
  };

  // JSX rendering
  return (
    <div>
      <h2>Contacts</h2>
      {/* Table to display contacts */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through contacts and render each contact as a table row */}
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>
                {/* Button to update contact */}
                <button onClick={() => updateContact(contact)}>Update</button>
                {/* Button to delete contact */}
                <button onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList; // Export the ContactList component
