# Course Information
Part 1: Introduction to React

Full Stack Course at th University of Helsinky (2021)

This is a compilation of the exercises 1.1 to 1.5

## Exercises 1.1 and 1.2 - course information, steps 1 and 2

```javascript
import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Content = (props) => {
  return (
    <>
      <Part name={props.p1} numex={props.ex1} />
      <Part name={props.p2} numex={props.ex2} />
      <Part name={props.p3} numex={props.ex3} />
    </>
  )
}

const Part = (props) => (<p>{props.name} {props.numex}</p>)

const Total = (props) => (<p>Number of exercises: {props.total}</p>)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={part1} ex1={exercises1} p2={part2} ex2={exercises2} p3={part3} ex3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
```

## Exercise 1.3 - course information, step 3

```javascript
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
```

## Exercise 1.4 - course information, step 4
```javascript
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

```

## Exercise 1.5 - course information, step 5

Just changed this part:

```javascript
const App = () => {
const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
```
