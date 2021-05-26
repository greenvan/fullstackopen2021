# Unicafe
From *Part 1: Introduction to React* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of the exercises 1.6 to 1.11

Source files can be found in ['unicafe/src'](https://github.com/greenvan/fullstackopen2021/tree/main/part1/courseinfo/src) folder

## Exercises 1.6 - unicafe, step 1

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good_count, neutral_count, bad_count }) => {
  return (
    <>
    <h1>Statistics</h1>
    <div>Good: {good_count}</div>
    <div>Neutral: {neutral_count}</div>
    <div>Bad: {bad_count}</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {setGood(good + 1)}
  const addNeutral = () => {setNeutral(neutral + 1)}
  const addBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>Give us feedback</h1>
      <button onClick={() => addGood()}>Good</button>
      <button onClick={() => addNeutral()}>Neutral</button>
      <button onClick={() => addBad()}>Bad</button>      
      <Statistics good_count={good} neutral_count={neutral} bad_count={bad}  />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```