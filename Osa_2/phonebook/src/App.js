import { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import personService from './services/persons.js'
import Notification from './components/Notification.js'
import ErrorNotification from './components/ErrorNotification.js'
import './index.css'; 



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setNewFilterStr] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target); 
    if (findDuplicates(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        //console.log(person);
        
        const changedPerson = { ...person, number: newNumber }
        //console.log(changedPerson);
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            //console.log("THIS ONE");
            //console.log(returnedPerson);
            const err = returnedPerson.name //to invoke error if null
            
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            //console.log(persons);
            
            setMessage(`Replaced the number of ${newName} with ${newNumber}`)
            setTimeout(() => {
            setMessage(null)
            }, 4000)
            setNewName('')
            setNewNumber('')
        }).catch(error => {
          //console.log(error);
          
          if (error.code === "ERR_BAD_REQUEST") {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
            setErrorMessage(null)
            }, 4000)
          } else {
            //console.log("here");
            
            setErrorMessage(`Information of '${newName}' has already been removed from the server`)
            setTimeout(() => {
            setErrorMessage(null)
            }, 4000)
            setPersons(persons.filter(n => n.id !== person.id))
          } 
        })  
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      } 
      personService.create(personObj).then(res => {
        setPersons(persons.concat(res)) 
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }) 
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

  const handleRemoval = (person) => {
    //console.log(`removed ${id}`);
    if (window.confirm(`Remove ${person.name}?`)) {
      personService.removePerson(person.id).then(
        setPersons(persons.filter(n => n.id !== person.id))
      )
    } else return
  }

  //console.log(persons);
  
  const personsToShow = persons.filter(person => ~person.name.indexOf(filterStr) || ~person.name.toLowerCase().indexOf(filterStr))


  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      <Filter filterStr={filterStr} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} handleRemoval={handleRemoval}/>
    </div>
  )
}

export default App