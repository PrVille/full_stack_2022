import React from 'react'


const Person = ({ person, handleRemoval }) => {  
  //console.log(person);
  
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleRemoval}>remove</button>
    </div>
  )
}

const Persons = ({ persons, handleRemoval }) => {
  
  return (
    <>
      {persons.map(person => <Person key={person.name} person={person} handleRemoval={() => handleRemoval(person)} />)}
    </>
  )
}

export default Persons