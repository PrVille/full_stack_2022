import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import './App.css'; //Messed around with styles



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setNewFilterStr] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target); 
    if (findDuplicates(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      } 
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilterStr(event.target.value)
  }

  const findDuplicates = (name) => {
    //console.log("TEST FIND DUPLICATES", persons.map(obj => obj.name).includes(name))
    return persons.map(obj => obj.name).includes(name)
  }

  const personsToShow = persons.filter(person => ~person.name.indexOf(filterStr) || ~person.name.toLowerCase().indexOf(filterStr))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterStr={filterStr} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App