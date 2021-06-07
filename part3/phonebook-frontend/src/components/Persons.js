import React from 'react'

import Button from './Button'

const Person = ({ person, onClickHandler }) => 
<p>
    {person.name}: {person.number} <Button text="Delete" value={person.id} name={person.name} onClick={onClickHandler} /></p>

const Persons = ({ persons, onClickHandler }) =>
    persons.map((person) => <Person key={person.name} person={person} onClickHandler={onClickHandler}/>)

export default Persons