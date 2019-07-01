import React from 'react';
import Button from './Button';

const Contact = ({ name, number, onClick }) => {
  
  return(
    <div>
      <p>{name} {number}</p>
      <Button 
        text={'Delete'}
        onClick={onClick}
      />
    </div>
  )
}

export default Contact;