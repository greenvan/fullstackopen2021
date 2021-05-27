import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) =>  <h1>{course.name}</h1>
  
const Total = ({course}) => 
    <p>Number of exercises 
      {course.parts[0].exercises + 
      course.parts[1].exercises + 
      course.parts[2].exercises}
      </p>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>    

const Content = ({course}) => 
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>


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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))