import React, { useState } from 'react';
import './addcontact.css';

const ContactForm = ({ addContactHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleChangeName = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: '' }); // Clear error message on name change
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: '' }); // Clear error message on email change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      addContactHandler(name, email);
      setName('');
      setEmail('');
    }
  };
  //improved email validation funtion 
  
  const isValidEmail = (email) => {
    // You can implement your own email validation logic here
    // For simplicity, we'll use a basic regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={handleChangeName}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;