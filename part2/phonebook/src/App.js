import React, { useState, useEffect } from 'react'

import phoneService from './services/phones'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Footer from './components/Footer'

import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const personInDB = persons.find((person) => person.name === newName)
    if (personInDB) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...personInDB, number: newNumber }
        phoneService
          .update(personInDB.id, changedPerson)
          .then(returnedPerson => {
            setNotificationMessage(`'${returnedPerson.name}' updated succesfully`)
            setTimeout(() => {setNotificationMessage(null)}, 5000)

            setPersons(persons.map(person => person.name !== personInDB.name ? person : changedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {       //If it is shortly removed before update     
            setErrorMessage(`The number of '${personInDB.name}' was removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setPersons(persons.filter(p => p.name !== personInDB.name))
            //We do not setNewName('') nor setNewNumber(''), so it is posible for the user to add with this info
          })
      }

    }
    else {
      const numberObject = { name: newName, number: newNumber }
      phoneService
        .create(numberObject)
        .then(returnedPhone => {
          setNotificationMessage(`Added '${returnedPhone.name}'`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
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

  const handleOnClickDelete = (event) => {

    const name = event.target.name

    if (window.confirm(`Delete '${name}'?`)) {
      const id = event.target.value
      phoneService
        .del(id)
        .then((req) => {
          setNotificationMessage(`'${name}' deleted succesfully`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
          setPersons(persons.filter(p => p.name !== name))
        })
        .catch(error => {
          setErrorMessage(`The number of '${name}' was already removed from server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(p => p.name !== name))
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
      <Persons persons={personsToShow} onClickHandler={handleOnClickDelete} />
      <Footer />
    </div>
  )
}

export default App