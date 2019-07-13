import React, { useState, useEffect } from 'react';
import Input from'./components/Input';
import axios from 'axios';
import Country from './components/Country';
// import Button from './components/Button';


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    });
  }, []);

  // console.log(countries);

  const handleFilter = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
    console.log(filter);
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  });

  const results = () => {
    if (filteredCountries.length > 10) {
      console.log(filteredCountries.length);
      return (
        <p>Too many matches, please specify search criteria</p>
      )
      
    } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      console.log('less than ten', filteredCountries.length, filteredCountries);
      return (
        filteredCountries.map(country =>
          <li key={country.index} style={{listStyleType: 'none'}}>
              {country.name}
              <button onClick={() => setFilter(country.name)}>Show</button>
          </li>
        )  
      ) 
    } else {
      console.log('one', filteredCountries);
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
