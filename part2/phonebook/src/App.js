import React, { useState } from 'react'


const Person = ({person}) => <p>{person.name}</p>


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault() //to prevent the default action of submitting HTML forms
    const numberObject = {name: newName}
    setPersons(persons.concat(numberObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addNumber}>
        <div>
          Name:
        <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App