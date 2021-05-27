import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const lenght = anecdotes['length']
  const [points, setPoints] = useState(new Array(lenght).fill(0))

  const vote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy);
  }

  //Modified to include max from https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getNext = () => {
    const random = getRandomInt(0, anecdotes['length'] - 1)
    setSelected(random)
  }

  const mostVoted= points.indexOf(Math.max(...points))

  return (
    <>
    <h1>Anecdote of the day</h1>
    <cite>
      {props.anecdotes[selected]}
    </cite>
    <div>Has {points[selected]} votes</div>
      <Button handleClick={() => vote(selected)} text="Vote" />
      <Button handleClick={() => getNext()} text="Next anecdote" />
      
    <h1>Anecdote with most votes</h1>
    <cite>
      {props.anecdotes[mostVoted]}
    </cite>
    <div>Has {points[mostVoted]} votes</div>
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