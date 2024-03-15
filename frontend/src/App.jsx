import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  // State variables
  const [contacts, setContacts] = useState([]); // Stores the list of contacts
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks if the modal is open
  const [currentContact, setCurrentContact] = useState({}); // Stores the current contact being edited

  // Fetch contacts from the backend when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch contacts from the backend server
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentContact({}); // Reset the current contact
  };

  // Open the modal for creating a new contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true); // Open the modal if it's not already open
  };

  // Open the modal for editing an existing contact
  const openEditModal = (contact) => {
    if (isModalOpen) return; // If modal is already open, do nothing
    setCurrentContact(contact); // Set the current contact to be edited
    setIsModalOpen(true); // Open the modal
  };

  // Callback function called after updating a contact
  const onUpdate = () => {
    closeModal(); // Close the modal
    fetchContacts(); // Fetch updated list of contacts
  };

  // JSX rendering
  return (
    <>
      {/* Render the list of contacts */}
      <ContactList
        contacts={contacts}
        updateContact={openEditModal} // Function to open modal for editing contact
        updateCallback={onUpdate} // Callback function after updating contact
      />
      {/* Button to create a new contact */}
      <button onClick={openCreateModal}>Create New Contact</button>
      {/* Modal for creating/editing contact */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* ContactForm component inside modal */}
            <ContactForm
              existingContact={currentContact} // Data of the current contact being edited
              updateCallback={onUpdate} // Callback function after updating contact
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
