import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good_count, neutral_count, bad_count }) => {

  const all = good_count + neutral_count + bad_count

  if (all === 0) return <div>No feedback given yet</div>

  //If there's have been feedback we continue
  const average = (good_count * 1 + bad_count * (-1)) / all
  const positive = (good_count / all) * 100

  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good_count} />
        <Statistic text="Neutral" value={neutral_count} />
        <Statistic text="Bad" value={bad_count} />
        <Statistic text="Total" value={all} />
        <Statistic text="Average" value={average.toFixed(2)} /> 
        <Statistic text="Positive" value={positive.toFixed(2) + '%'} />
      </tbody>
    </table>
  )
  //.toFixed(2) shows only two decimal positions
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => { setGood(good + 1) }
  const addNeutral = () => { setNeutral(neutral + 1) }
  const addBad = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>Give us feedback</h1>
      <Button handleClick={() => addGood()} text="Good" />
      <Button handleClick={() => addNeutral()} text="Neutral" />
      <Button handleClick={() => addBad()} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good_count={good} neutral_count={neutral} bad_count={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)