import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contact from './components/Contact';
import FilterForm from './components/FilterForm';
import NewContactForm from './components/NewContactForm';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        setPersons(response.data);
      })
  }, [])

  console.log('render', persons.length, 'contacts');

  /// filtering added contacts
  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  }

  let filteredContacts = persons.filter(
    (person) => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
  );

  /// adding new contacts
  const addInfo = (event) => {
    event.preventDefault();
    console.log('Lisätään:', newName, newNumber);

    
    const contactObject = {
      name: newName,
      number: newNumber
    }
   
    console.log(contactObject);
    console.log(persons);

    persons.forEach(function(person){
      console.log(person.name, contactObject.name);
      person.name === contactObject.name ?
        window.alert(`${person.name} is already added to the phonebook`)
        : setPersons(persons.concat(contactObject));
    })
    
    setNewName('');
    setNewNumber('');
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const contacts = () => filteredContacts.map(person => 
    <Contact 
      key={person.name}
      name={person.name}
      number={person.number}
    />
  )

  return (
    <div>
      <h2>Phonebook</h2>
        <FilterForm 
          labelText={'Filter contacts with'}
          value={filter}
          onChange={handleFilter}
        />
        <NewContactForm
          header={'Add a new contact'}
          onSubmit={addInfo}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
          addInfo={addInfo}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          newName={newName}
          newNumber={newNumber}
        />
      <h3>Numbers</h3>
      <div>
        {contacts()}
      </div>
    </div>
  )
}

export default App;