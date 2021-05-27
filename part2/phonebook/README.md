# Phone Book
From *Part 2: Communicating with servert* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of the exercises 2.6 to 2.11 and 2.15 to 2.20

Source files can be found in ['phonebook/src'](https://github.com/greenvan/fullstackopen2021/tree/main/part2/phonebook/src) folder

App is on `App.js` file.

## Exercise 2.6: Phone Book, step 1

```js
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
```

## Exercise 2.7: Phone Book, step 2

Added this part in addNumber Function:

```js
    //Check if it is already in database
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const numberObject = { name: newName }
      setPersons(persons.concat(numberObject))
      setNewName('')
    }

```