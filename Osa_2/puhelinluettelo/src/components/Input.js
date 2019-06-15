import React from 'react';

const Input = (props) => {
  return(
    <div>
      <label>
            {props.label}
            <input
              value={props.value}
              onChange={props.onChange}
            />
          </label>
    </div>
  )
}

export default Input;