import React, { useState, useEffect } from 'react';
import Input from'./components/Input';
import axios from 'axios';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      });
  }, []);

  const handleFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  });

  const results = () => {
    if (filteredCountries.length > 10) {
      return (
        <p>Too many matches, please specify search criteria</p>
      )
    } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      return (
        filteredCountries.map(country =>
          <li key={country.name} style={{listStyleType: 'none'}}>
              {country.name}
              <button onClick={() => setFilter(country.name)}>Show</button>
          </li>
        )  
      ) 
    } else {
      return (
        filteredCountries.map(country =>
        <Country
          key={country.name}
          name={country.name}
          capital={country.capital}
          population={country.population}
          languages={country.languages}
          flag={country.flag}
        />
      )
    )}
  }
  
  return (
    <div>
      <Input
        onChange={handleFilter} 
        label={'Search for countries'}
      />
      <br/>
      {filter && 
        <div>{results()}</div>
      }
    </div>
  );
}

export default App;
