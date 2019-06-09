import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault();
    console.log('Lisätään:', newName);
    const contactObject = {
      name: newName,
    }
    
    setPersons(persons.concat(contactObject));
    setNewName('');
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  console.log(persons);

  const Contact = (props) => (
    <div>
      <p>{props.name}</p>
    </div>
  )

  const contacts = () => persons.map(person => 
    <Contact 
      key={person.name}
      name={person.name}/>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <label>
            Name:
            <input
              value={newName}
              onChange={handleNewName}
            />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {contacts()}
      </div>
    </div>
  )

}

export default App;