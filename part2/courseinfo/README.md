# Course Information
From *Part 2: Communicating with servert* of **Full Stack Course at the University of Helsinky (2021)**

This is a compilation of the exercises 2.1 to 2.5

Source files can be found in ['courseinfo/src'](https://github.com/greenvan/fullstackopen2021/tree/main/part1/courseinfo/src) folder

App is on `App.js` file.

## Exercises 2.1 to 2.3*: Course information, steps 6, 7 and 8

```js
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) =>
  <p><b>
    Total of {
      parts.reduce((total, part) => total + part.exercises, 0)
    } exercises
  </b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
  <div>
    {parts.map((part, i) => <Part key={i} part={part} />)}
  </div>

const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))

```