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

## Exercise 2.8: Phone Book, step 3

`Person` component has been modified to include the phone number:
```js
const Person = ({ person }) => <p>{person.name}: {person.phone}</p>
```

In `App`:
1. Added new state const:
```js
  const [newNumber, setNewNumber] = useState('')
``` 

2. Modified the part in which the Person list state is set:
```js
      const numberObject = { name: newName, phone: newNumber }
      setPersons(persons.concat(numberObject))
      setNewName('')
      setNewNumber('')
```      

3. Added new handler for the Number input field
```js
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
```

4. Added a second input element for Number to the form

```js
        <div> 
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
```

## Exercise 2.9*: Phone Book, step 4

1. Added new state `filter` and `personsToShow` list created with persons that match the filter.

```js
  const [filter, setFilter] = useState('')

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(
      person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
 
```

2. Added a new input field to the form:
```js
    <div> 
        Filter shown whith: <input value={filter} onChange={handleFilterChange} />
    <div> 
```

3. Added a handler for the input field:
```js
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
```

