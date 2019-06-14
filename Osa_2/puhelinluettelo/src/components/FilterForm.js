import React from 'react';

const FilterForm = (props) => {
  return(
    <div>
      <label>
        {props.labelText}
        <input
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

export default FilterForm;