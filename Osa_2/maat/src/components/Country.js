import React from 'react';

function Country({ name, capital, population, languages, flag }) {

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h2>languages</h2>
        <ul>
            {languages.map(l =>
              <li key={l.name}>{l.name}</li>
            )}
        </ul>
      <img src={flag} width="150px" alt="country flag"/>
    </div>
  );
}

export default Country;