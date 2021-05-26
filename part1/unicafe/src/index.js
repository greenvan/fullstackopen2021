import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good_count, neutral_count, bad_count }) => {

  const all = good_count + neutral_count + bad_count
  const average = (good_count*1 + bad_count*(-1))/all
  const positive = (good_count/ all) * 100
  

  return (
    <>
    <h1>Statistics</h1>
    <div>Good: {good_count}</div>
    <div>Neutral: {neutral_count}</div>
    <div>Bad: {bad_count}</div>
    
    <div>Total number of feedbacks: {all}</div>    
    <div>Average: {average}</div>    
    <div>Positive: {positive} %</div>
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