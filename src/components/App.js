import './App.css';
import React, { useState ,useEffect} from 'react';
//useEffect is  used to store the data even after a refresh 
import {BrowserRouter as router ,Switch,route} from 'react-router-dom';
import Header from './Header';
import Addcontacts from './Addcontact';
import Contactlist from './contactlist';

function App() {
  const local_storage_key = "contacts"
  const [contacts, setContacts] = useState([]);

  function addContactHandler(name, email) {
    const newContact = {
      id: contacts.length + 1, // Assign a unique ID
      name,
      email,
    };
    setContacts([...contacts, newContact]);
  }
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };


  

  useEffect(() => {
    const retrivecontact =JSON.parse(localStorage.getItem(local_storage_key));
    if (retrivecontact)
      {setContacts(retrivecontact);}
  }, []);

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div className="ui container">
      <Header />
      <Addcontacts addContactHandler={addContactHandler} />
      <Contactlist contacts={contacts} onDelete={removeContactHandler} />
    </div>
  );
}

export default App;

