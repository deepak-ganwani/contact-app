import React, {useState, useEffect} from "react";
import {uuid} from "uuidv4";
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Deepak",
  //     email: "deepak.ganwani@spit.ac.in",
  //   },
  //   {
  //     id: "2",
  //     name: "Hardik",
  //     email: "hardik.garg@spit.ac.in",
  //   }
  // ]
  const LOCAL_STORAGE_KEY="contacts";

  const addContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}]);
  };

  const removeContactHandler=(id)=>{
    const newContactList=contacts.filter((contact)=>{
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  const[contacts, setContacts] = useState([]);

  useEffect(()=>{
    const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) setContacts(retriveContacts);
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className="ui container">
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactID={removeContactHandler}/>
    </div>
  );
}

export default App;
