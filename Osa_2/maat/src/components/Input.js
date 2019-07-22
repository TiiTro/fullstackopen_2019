import React from 'react';

function Input({ label, onChange }) {
  
  return (
    <form>
      <label>
        {label}
        <br/>
        <input onChange={onChange}></input>
      </label>
    </form>
  );
}

export default Input;
