import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].name} numex={props.parts[0].exercises} />
      <Part name={props.parts[1].name} numex={props.parts[1].exercises} />
      <Part name={props.parts[2].name} numex={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => (<p>{props.name} {props.numex}</p>)

const Total = (props) => (
  <p>Number of exercises:
    {
      props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises
    }
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
