import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) =>
  <p><b>
    Total of {
      parts.reduce((total, part) => total + part.exercises, 0)
    } exercises
  </b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

//TODO not safe enough to use index of the array
const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>

const Course = ({ course }) =>
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

  export default Course;