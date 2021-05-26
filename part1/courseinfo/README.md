# Course Information
<<<<<<< HEAD
From *Part 1: Introduction to React* of **Full Stack Course at the University of Helsinky (2021)**
=======
From *Part 1: Introduction to React* of **Full Stack Course at th University of Helsinky (2021)**
>>>>>>> 3560c403b5bc43c2f2d672b147b92537ab9ad9d3

This is a compilation of the exercises 1.1 to 1.5

Source files can be found in ['courseinfo/src'](courseinfo/src) folder

## Exercises 1.1 and 1.2 - course information, steps 1 and 2

<<<<<<< HEAD
```js
=======
```javascript
>>>>>>> 3560c403b5bc43c2f2d672b147b92537ab9ad9d3
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

```js
import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Content = (props) => {
  return (
    <>    
  // highlight-start
      <Part name={props.p1.name} numex={props.p1.exercises} />
      <Part name={props.p2.name} numex={props.p2.exercises} />
      <Part name={props.p3.name} numex={props.p3.exercises} />
   // highlight-end
    </>
  )
}

const Part = (props) => (<p>{props.name} {props.numex}</p>)

const Total = (props) => (<p>Number of exercises: {props.total}</p>)

const App = () => {
  const course = 'Half Stack application development'
  
  // highlight-start
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
// highlight-end

  return (
    <div>
      <Header course={course} />
      // highlight-start
      <Content p1={part1}  p2={part2}  p3={part3}  />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
      // highlight-end
    </div>
  )
}

export default App
```

## Exercise 1.4 - course information, step 4
<<<<<<< HEAD

```js
=======
```javascript
>>>>>>> 3560c403b5bc43c2f2d672b147b92537ab9ad9d3
import React from 'react'

const Header = (props) => (
  <h1>
    {props.course}
  </h1>
)

const Content = (props) => {
  return (
    <>
    // highlight-start
      <Part name={props.parts[0].name} numex={props.parts[0].exercises} />
      <Part name={props.parts[1].name} numex={props.parts[1].exercises} />
      <Part name={props.parts[2].name} numex={props.parts[2].exercises} />
    // highlight-end
    </>
  )
}

const Part = (props) => (<p>{props.name} {props.numex}</p>)

const Total = (props) => (
  <p>Number of exercises:
  // highlight-start
    {
      props.parts[0].exercises +
      props.parts[1].exercises +
      props.parts[2].exercises
    }
    // highlight-end
  </p>
)

const App = () => {
  const course = 'Half Stack application development'
  // highlight-start
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
  // highlight-end

  return (
    <div>
      <Header course={course} />
      // highlight-start
      <Content parts={parts} />
      <Total parts={parts} />
      // highlight-end
    </div>
  )
}

export default App

```

## Exercise 1.5 - course information, step 5

Just changed this part:

<<<<<<< HEAD
```js
=======
```javascript
>>>>>>> 3560c403b5bc43c2f2d672b147b92537ab9ad9d3
const App = () => {
// highlight-start
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
  // highlight-end

  return (
    <div>
    // highlight-start
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    // highlight-end
    </div>
  )
}
```
