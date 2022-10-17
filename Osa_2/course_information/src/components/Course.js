import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
    return (
      <>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </>
    )
  }
  
const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.map(obj => obj.exercises).reduce((p, c) => p + c, 0);
  //console.log(total);
  
  return (
    <>
      <p><b>Number of exercises {total}</b></p>
    </>
  )
}

const Course = ({ course }) => {  
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default Course