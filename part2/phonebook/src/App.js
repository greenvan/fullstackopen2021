import React, { useState, useEffect } from 'react'

import phoneService from './services/phones'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })
  }, [])

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(
      person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )

  const addNumber = (event) => {
    event.preventDefault() //to prevent the default action of submitting HTML forms

    //Check if it is already in database
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const numberObject = { name: newName, number: newNumber }
      phoneService
      .create(numberObject)
      .then(returnedPhone  => {
        setPersons(persons.concat(returnedPhone))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChangeHandler={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmitHandler={addNumber}
        name={newName}
        onChangeNameHandler={handleNameChange}
        number={newNumber}
        onChangeNumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App