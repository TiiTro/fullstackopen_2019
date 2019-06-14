import React, { useState } from 'react';
import Contact from './components/Contact';
import FilterForm from './components/FilterForm';

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  }

  let filteredContacts = persons.filter(
    (person) => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
  );

  const addInfo = (event) => {
    event.preventDefault();
    console.log('Lisätään:', newName, newNumber);
    const contactObject = {
      name: newName,
      number: newNumber
    }

    // console.log(persons);

    // function removeDuplicates(persons) {
    //   let unique = {};
    //   persons.forEach(function(p) {
    //     person.name === contactObject.name ?
    //   })
    // }

    // persons.forEach(function(person){
    //   console.log(person.name, contactObject.name);
    //   person.name === contactObject.name ?
    //     setPersons(persons)
    //     window.alert(`${person.name} is already added to the phonebook`)
    //     : setPersons(persons.concat(contactObject));
    // })
    setPersons(persons.concat(contactObject));
    setNewName('');
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  console.log(persons);

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
      <h3>Add a new contact</h3>
      <form onSubmit={addInfo}>
        <div>
          <label>
            Name:
            <input
              value={newName}
              onChange={handleNewName}
            />
          </label>
          <br />
          <label>
            Number:
            <input
              value={newNumber}
              onChange={handleNewNumber}
            />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <div>
        {contacts()}
      </div>
    </div>
  )

}

export default App;