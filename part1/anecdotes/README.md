# Anecdotes
From *Part 1: Introduction to React* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of the exercises 1.12 to 1.14

Source files can be found in ['anecdotes/src'](https://github.com/greenvan/fullstackopen2021/tree/main/part1/anecdores/src) folder

## Exercises 1.12* - anecdotes, step 1

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)

//Modified to include max from https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
  const getNext = () => {   
    const random = getRandomInt(0,anecdotes['length']-1)
    setSelected(random)   
  }

  return (
    <><div>
      {props.anecdotes[selected]}
    </div>
    <Button handleClick={() => getNext()} text="Next anecdote"/>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
```

## Exercises 1.13* - anecdotes, step 2

```js

```

## Exercises 1.14* - anecdotes, step 3

```js

```