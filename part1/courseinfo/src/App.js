import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Content = (props) => {
  return (
    <>
      <Part name={props.p1.name} numex={props.p1.exercises} />
      <Part name={props.p2.name} numex={props.p2.exercises} />
      <Part name={props.p3.name} numex={props.p3.exercises} />
    </>
  )
}

const Part = (props) => (<p>{props.name} {props.numex}</p>)

const Total = (props) => (<p>Number of exercises: {props.total}</p>)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content p1={part1}  p2={part2}  p3={part3}  />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
