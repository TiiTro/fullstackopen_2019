import React, { useState } from 'react';
import Contact from './components/Contact';
import FilterForm from './components/FilterForm';
import NewContactForm from './components/NewContactForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


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

    setPersons(persons.concat(contactObject));
    
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