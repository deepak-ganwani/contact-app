import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import {v4} from 'uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import api from '../api/contacts'

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

  const[contacts, setContacts] = useState([]);
  const[searchTerm, setSearchTerm]=useState("");
  const[searchResults, setSearchResults]=useState([]);

  const addContactHandler=async(contact)=>{
    console.log(contact);
    const request={
      id:v4(),
      ...contact
    }

    const response=await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler=async(contact)=>{
    const response=await api.put(`/contact/${contact.id}`, {contact});
    const {id, name, email}=response.data;
    console.log(email, name);
    setContacts(contacts.map((contact)=>{
      return contact.id===id?{...response.data}:contact;
    })
    );
  }

  const removeContactHandler=async(id)=>{
    await api.delete(`/contacts/${id}`);
    const newContactList=contacts.filter((contact)=>{
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm!==""){
      const newContactList=contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else setSearchResults(contacts);
  }

  // Retrive Contacts
  const retrieveContacts=async()=>{
    const response=await api.get("/contacts");
    return response.data;
  };

  useEffect(()=>{
    // const retriveContacts=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retriveContacts) setContacts(retriveContacts);
    // console.log(retriveContacts);

    const getAllContacts =async ()=>{
      const allContacts= await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();
  },[]);

  useEffect(()=>{
    if(contacts.length) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  },[contacts]);

  return (
    <div className="ui container">
        <Header/>
        <Switch>
          {/* <Route exact path="/" component={()=>(<ContactList contacts={contacts} getContactID={removeContactHandler}/>)} /> */}
          {/* <Route path="/" element={<ContactList contacts={contacts} getContactID={removeContactHandler}/>}/> */}
          {/* <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />}/> */}
          
          <Route path="/add" render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)}/>
          <Route path="/edit" render={(props)=>(<EditContact {...props} updateContactHandler={updateContactHandler}/>)}/>
          <Route path="/" exact render={(props)=>(<ContactList {...props} 
          contacts={searchTerm.length<1?contacts:searchResults} getContactID={removeContactHandler}
          term={searchTerm} searchKeyword={searchHandler}
          />)}/>
          <Route path="/contact/:id" component={(props) => <ContactDetail {...props} />}/>;
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler}/> */}
        {/* <ContactList contacts={contacts} getContactID={removeContactHandler}/> */}
      
    </div>
  );
}

export default App;
