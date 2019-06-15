import React from 'react';
import Input from './Input';

const NewContactForm = (props) => {
  const { 
    newName,
    handleNewName,
    newNumber,
    handleNewNumber,
    addInfo } 
  = props;
  
  return(
    <div>
      <h3>{props.header}</h3>
      <form onSubmit={addInfo}>
        <div>
          <Input 
            label={'Name:'}
            value={newName}
            onChange={handleNewName}
          />
          <br />
          <Input 
            label={'Number:'}
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default NewContactForm;