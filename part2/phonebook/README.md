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
        Filter shown with: <input value={filter} onChange={handleFilterChange} />
    <div> 
```

3. Added a handler for the input field:
```js
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
```

## Exercise 2.10: Phone Book, refactoring
At this point the App is in this state:

`App.js` file:
```js
import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
```

File: `Filter.js` in `components` sub-folder:
```js 
import React from 'react'

const Filter = ({ filter, onChangeHandler }) =>
    <div>
        Filter shown with: <input value={filter} onChange={onChangeHandler} />
    </div>

export default Filter
```

File: `PersonForm.js` in `components` sub-folder:
```js 
import React from 'react'

const PersonForm = ({
    onSubmitHandler,
    name,
    onChangeNameHandler,
    number,
    onChangeNumberHandler
}) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                Name: <input value={name} onChange={onChangeNameHandler} />
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>)
}

export default PersonForm
```

File: `Persons.js` in `components` sub-folder:
```js 
import React from 'react'

const Person = ({ person }) => <p>{person.name}: {person.number}</p>

const Persons = ({ persons }) =>
    persons.map((person) => <Person key={person.name} person={person} />)

export default Persons
```


## Exercise 2.11: Phone Book, step 6
Followed steps
1. Create db.json on root directory
2. Install axios and json server on dev mode:

`$ npm install axios`

`$ npm install json-server --save-dev`

3. Add this line to packages.json

`"server": "json-server -p3001 --watch db.json"`

4. Run server

`$ npm run server`

5. Edit `App.js` file: Import axios, useEffect and add this to App()

```js
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
```

## Exercise 2.15 and 2.16: PhoneBook steps 7 and 8
Save new numbers to a backend server

Created file `services/phones.js`:

```js
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  export default { getAll, create, update }
```

Updated `App.js`:

```js
import phoneService from './services/phones'

[...]
//Initial list
  useEffect(() => {
    phoneService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })
  }, [])

  [...]
  //Add new phone
  const numberObject = { name: newName, number: newNumber }
  phoneService
    .create(numberObject)
    .then(returnedPhone  => {
        setPersons(persons.concat(returnedPhone))
        setNewName('')
        setNewNumber('')
      }
    )
```

## Exercise 2.17: PhoneBook step 9
Allow users to delete entries.

New component in `components/Button.js`

```js
import React from 'react'

const Button = ({text,value, name, onClick}) =>  <button value={value}  name={name} onClick={onClick}>
      {text}
    </button>

export default Button;
```

New function in `services/phones.js`

```js
  const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request;
  }
```

Modify `components/Persons.js` to include de delete Button and his onClickHandler:

```js
import React from 'react'
import Button from './Button'

const Person = ({ person, onClickHandler }) => 
<p>
    {person.name}: {person.number} <Button text="Delete" value={person.id} name={person.name} onClick={onClickHandler} /></p>

const Persons = ({ persons, onClickHandler }) =>
    persons.map((person) => <Person key={person.name} person={person} onClickHandler={onClickHandler}/>)

export default Persons
```

In `App.js` include the new const `handleOnClickDelete` and pass it to the `Persons` component:

```js
  const handleOnClickDelete = (event) => {

    const name = event.target.name

    if (window.confirm(`Delete '${name}'?`)) {

      const id = event.target.value
      phoneService
        .del(id)
        .then((req) => {
          setPersons(persons.filter(p => p.name !== name))  
        })
        .catch(error => {
          alert(`The number of ${name} was already deleted from server`)
          setPersons(persons.filter(p =>  p.name !== name))
        })
    }
  }

  [...]
  
      <Persons persons={personsToShow} onClickHandler={handleOnClickDelete} />
```

## Exercise 2.18*: PhoneBook step 10
Allow updates.

In `services/phones.js` add `update`:

```js
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
```

In `App.js` inside `addNumber` function:

```js
  const personInDB = persons.find((person) => person.name === newName)
    if (personInDB) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...personInDB, number: newNumber }
        phoneService
          .update(personInDB.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== personInDB.name ? person : changedPerson))
            setNewName('')
            setNewNumber('')
          })
      }

    }
```

## Exercise 2.19: PhoneBook step 11

Added `components/Notification.js`:
```js 
import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  export default Notification
``` 

Added `index.css`:

```css
  .notification {
    color: green;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;    
    max-width: 500px;
  }
```
Import css to `index.js`:
```js
import './index.css'
```

Modify `App.js`:

```js 
import Notification from './components/Notification'
[...]
//New state declaration
  const [notificationMessage, setNotificationMessage] = useState(null)
[...]

//Modify addNumber function to show different messages when added or updated
const addNumber = (event) => {
    event.preventDefault() 
    const personInDB = persons.find((person) => person.name === newName)
    if (personInDB) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const changedPerson = { ...personInDB, number: newNumber }
        phoneService
          .update(personInDB.id, changedPerson)
          .then(returnedPerson => {
            //Notification
            setNotificationMessage(`'${returnedPerson.name}' updated succesfully`)
            setTimeout(() => {setNotificationMessage(null)}, 5000)

            setPersons(persons.map(person => person.name !== personInDB.name ? person : changedPerson))
            setNewName('')
            setNewNumber('')
          })
      }

    }
    else {
      const numberObject = { name: newName, number: newNumber }
      phoneService
        .create(numberObject)
        .then(returnedPhone => {
          //Notification
          setNotificationMessage(`Added '${returnedPhone.name}'`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)

          setPersons(persons.concat(returnedPhone))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  [...]
      //Add the Notification component after h2 title
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
```


## Exercise 2.20*: PhoneBook step 12

Added `components/Error.js`:

```js 
import React from 'react'

const Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  export default Error
``` 

Added error class to `index.css`:

```css
  .error {
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    max-width: 500px;
  }
```

`App.js` is in this state at the moment:

1. 'Green' Notification messages are shown whenever it takes place a succesful event: add, modify or delete
2. 'Red' Error messages are shown when some sort of error takes place at deleting or modifying.

```js
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
```