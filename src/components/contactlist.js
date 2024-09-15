import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactList.css';

const ContactList = ({ contacts, onDelete, onSave }) => {
  const [editableContacts, setEditableContacts] = useState(contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEditableContacts(contacts);
  }, [contacts]);

  const handleInputChange = (id, field, value) => {
    const updatedContacts = editableContacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setEditableContacts(updatedContacts);
  };

  const handleSave = () => {
    onSave(editableContacts);
  };

  const handleDelete = (id) => {
    onDelete(id);
    setEditableContacts(editableContacts.filter(contact => contact.id !== id));
  };

  const handleAddContact = () => {
    navigate('/add');
  };

  const handleItemClick = (id, e) => {
    if (e.target.tagName !== 'INPUT' && !e.target.classList.contains('trash')) {
      navigate(`/contact/${id}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = editableContacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="contact-list">
      <button className="add-button" onClick={handleAddContact}>Add Contact</button>
      <input
        type="text"
        placeholder="Search Contacts"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      {filteredContacts.map(contact => (
        <div className="contact-item" key={contact.id} onClick={(e) => handleItemClick(contact.id, e)}>
          <div className="contact-content">
            <div className="contact-header">
              <input
                type="text"
                value={contact.name}
                onChange={(e) => handleInputChange(contact.id, 'name', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={contact.email}
                onChange={(e) => handleInputChange(contact.id, 'email', e.target.value)}
              />
            </div>
          </div>
          <i
            className="trash alternate outline icon"
            onClick={() => handleDelete(contact.id)}
          ></i>
        </div>
      ))}
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default ContactList;