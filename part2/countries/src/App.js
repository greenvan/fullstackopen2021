import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App=()=>{
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  
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
    setSelectedCountry('')
  }

  const handleCountryOnClick = (event) => 
    setSelectedCountry(countries.find(country => country.alpha3Code === event.target.value))    

  return (
    <div>
      <h2>Data for countries</h2>
      <Filter filter={filter} onChangeHandler={handleFilterChange} />
      <Countries countries={countriesToShow} onClickHandler={handleCountryOnClick} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App

