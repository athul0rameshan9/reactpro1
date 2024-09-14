import React, { useState } from 'react';
import './ContactList.css'; // Assuming a CSS file for styling

const ContactList = ({ contacts, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sorting by name

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    setSortBy(field);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = filteredContacts.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'email') {
      return a.email.localeCompare(b.email);
    }
    return 0;
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Contact List</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search contacts"
          className="border rounded-md p-2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="p-2">Index</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
              Name
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('email')}>
              Email
            </th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{contact.name}</td>
                <td className="p-2">{contact.email}</td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 text-center" colSpan={5}>
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;