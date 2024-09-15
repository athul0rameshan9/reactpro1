import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import axios from 'axios'; // Import axios
import AddContact from './Addcontact';
import ContactList from './contactlist';
import ContactDetail from './ContactDetail';
import './App.css';



const App = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from JSON server
  const retrieveContacts = async () => {
    const response = await axios.get('http://localhost:3001/contacts');
    return response.data;
  };

  // Add a contact
  const addContactHandler = async (contact) => {
    const response = await axios.post('http://localhost:3001/contacts', contact);
    setContacts([...contacts, response.data]);
  };

  // Update contacts
  const saveContactsHandler = async (updatedContacts) => {
    const promises = updatedContacts.map(contact =>
      axios.put(`http://localhost:3001/contacts/${contact.id}`, contact)
    );

    await Promise.all(promises);
    setContacts(updatedContacts);
  };

  // Delete a contact
  const removeContactHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                onDelete={removeContactHandler}
                onSave={saveContactsHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;