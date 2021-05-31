# Data for countries
From *Part 2: Communicating with servert* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of the exercises 2.12 to 2.14

Source files can be found in ['countries/src'](https://github.com/greenvan/fullstackopen2021/tree/main/part2/phonebook/src) folder

## Exercise 2.12* Data for countries, step 1

File `App.js`
```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App=()=>{
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow=(filter === '')
  ? countries
  : countries.filter(
    country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Data for countries</h2>
      <Filter filter={filter} onChangeHandler={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App
```


File `components\Filter.js` is similar to the one in `phonebook` app
```js 
import React from 'react'

const Filter = ({ filter, onChangeHandler }) =>
    <div>
        Find countries with: <input value={filter} onChange={onChangeHandler} />
    </div>

export default Filter
```

File `components\Countries.js`
```js
import React from 'react'

const LanguageList = ({ languages }) =>
    languages.map((language) => <li key={language.iso639_1}>{language.name}</li>)

const Country = ({ country }) =>

    <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Spoken languages:</h3>
        <ul>
        <LanguageList languages={country.languages} />
        </ul>
        <img src={country.flag} alt="Flag" width="300"/>
    </>

const CountryItem = ({ country }) => <p>{country.name}</p>

const Countries = ({ countries }) => {
    const lenght = countries['length']

    if (lenght > 10)
        return <p>Too many matches, specify another filter</p>

    if (lenght === 0)
        return <p>No match</p>

    if (lenght === 1)
        return <Country key={countries[0].name} country={countries[0]} />

    return countries.map((country) => <CountryItem key={country.name} country={country} />)

}

export default Countries
```

## Exercise 2.13* Data for countries, step 2

Added a Button component in `components\Button.js`

```js
const Button = ({text,value, onClick}) =>  <button value={value}  onClick={onClick}>
      {text}
    </button>
```

Country and LanguageList components have been refactored to a new component file "County.js" but unmodified.

In App() at `App.js` a new state element has been added and a handler for the button element:

```js
  const [selectedCountry, setSelectedCountry] = useState('')


  const handleCountryOnClick = (event) => 
    setSelectedCountry(countries.find(country => country.alpha3Code === event.target.value))    
  ```

  At the Countries element, 

```js 
    if (selectedCountry !== '')
        return <Country key={selectedCountry.name} country={selectedCountry} />
```