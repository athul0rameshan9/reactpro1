import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ui card centered">
      <div className="image">
        <img src="https://via.placeholder.com/150" alt="user" />
      </div>
      <div className="content">
        <div className="header">{contact.name}</div>
        <div className="description">{contact.email}</div>
      </div>
    </div>
  );
};

export default ContactDetail;