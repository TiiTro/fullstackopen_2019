import React, { useState, useEffect } from 'react';
import Contact from './components/Contact';
import FilterForm from './components/FilterForm';
import NewContactForm from './components/NewContactForm';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  console.log(persons);

  // Deleting a contact from the server
  const handleDelete = (person) => {
    console.log('delete clicked')
    const removeContact = persons.filter(p => p.id !== person.id)
    const updatedContacts = {...removeContact}
    console.log(updatedContacts);

    window.confirm(`Are you sure you want to delete ${person.name}?`) ?
      personService
        .remove(person.id)
        .then(
          setPersons(updatedContacts))
      : console.log('not removing');
  }




  /// filtering added contacts
  const handleFilter = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  }

  let filteredContacts = persons.filter(
    (person) => {
      return person.name;
      // return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    }
  );

  /// adding new contacts
  const addInfo = (event) => {
    event.preventDefault();
    console.log('Lisätään:', newName, newNumber);

    const dublicateNames = persons.find(person => person.name === newName)
    // const dublicateNames = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (!dublicateNames) {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(contactObject));
      setNewName('');
      setNewNumber('');

      personService
        .create(contactObject)
        .then(newContact => {
          console.log(newContact);
      })

    } else {
      window.alert(`${newName} is already added to the phonebook`);
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const contacts = () => filteredContacts.map(person => 
    <Contact 
      key={person.name}
      name={person.name}
      number={person.number}
      onClick={() => handleDelete(person)}
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