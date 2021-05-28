import React, { useState } from 'react'


const Person = ({ person }) => <p>{person.name}: {person.number}</p>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
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
      <div>
        Filter shown whith: <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App