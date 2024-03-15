import { useState } from "react";

// ContactForm component
const ContactForm = ({ existingContact = {}, updateCallback }) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  // Check if the form is for updating an existing contact
  const updating = Object.entries(existingContact).length !== 0;

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct data object from form fields
    const data = {
      firstName,
      lastName,
      email,
    };

    // Determine URL and HTTP method based on whether it's an update or create operation
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // Send request to backend
    const response = await fetch(url, options);

    // Handle response
    if (response.status !== 201 && response.status !== 200) {
      // If response status is not success, show error message
      const data = await response.json();
      alert(data.message);
    } else {
      // If success, call the updateCallback function to update parent component
      updateCallback();
    }
  };

  // JSX rendering
  return (
    <form onSubmit={onSubmit}>
      {/* First Name input */}
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      {/* Last Name input */}
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      {/* Email input */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Submit button */}
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default ContactForm; // Export the ContactForm component
