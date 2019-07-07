import React, { useState, useEffect } from 'react';
import Contact from './components/Contact';
import FilterForm from './components/FilterForm';
import NewContactForm from './components/NewContactForm';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ notificationType, setNotificationType ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  // console.log(persons);

  // // Deleting a contact from the server
  const handleDelete = (person) => {
    console.log('delete clicked')

    window.confirm(`Are you sure you want to delete ${person.name}?`) ?
      personService
        .remove(person.id)
        .then(response => {
          const updatedContacts = persons.filter(p => p.id !== person.id);
          setPersons(updatedContacts);
          setNotification(`${person.name} has been removed from the phonebook`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })          
      : console.log('not removing');
  }

  /// adding new contacts
  const addInfo = (event) => {
    event.preventDefault();
    console.log('Lisätään:', newName, newNumber);

    const dublicateNames = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (!dublicateNames) {
      const contactObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(contactObject)
        .then(newContact => {
          console.log(newContact);
          setPersons(persons.concat(contactObject))
          setNotification(`${newContact.name} added to phonebook`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      })

    } else if (dublicateNames){
        if (dublicateNames.number !== newNumber) {
          const updatedContact = {...dublicateNames, number: newNumber}

          window.confirm(`${dublicateNames.name} is already added to the phonebook with the number ${dublicateNames.number}, replace it with ${newNumber}?`) ?            
            personService
              .update(dublicateNames.id, updatedContact)
              .then(updatedPerson => {
                console.log(updatedPerson)
                console.log(persons)
                setPersons(persons.map(person => person.id !== updatedPerson.id ?
                  person : updatedPerson));
                setNotification(`Number changed succesfully`)
                setNotificationType('success')
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
              .catch(error => {
                setNotification(`Could not update number, contact has been removed from the server`)
                setNotificationType('error')
              })          
          : console.log('not changing the number')
        } else {
          window.alert(`${dublicateNames.name} is already added to the phonebook`)
        }
    }
    setNewName('');
    setNewNumber('');      
  }

  const handleNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  /// filtering added contacts
  const handleFilter = (event) => {
    setSearch(event.target.value);
    console.log(search);
  }

  console.log(search);
  console.log(persons);

  const filteredContacts = persons.filter(person => {
    console.log(person.name)
    return person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  });

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
        <Notification 
          message={notification}
          type={notificationType}/>
        <FilterForm 
          labelText={'Filter contacts with'}
          value={search}
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
