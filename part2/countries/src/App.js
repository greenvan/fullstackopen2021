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

