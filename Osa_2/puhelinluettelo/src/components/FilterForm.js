import React from 'react';

const FilterForm = ({ labelText, value, onChange }) => {
  return(
    <div>
      <label>
        {labelText}
        <input
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default FilterForm;