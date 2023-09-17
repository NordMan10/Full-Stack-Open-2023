import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchReq, setNewSearchReq] = useState('')
  const [notificationState, setNotificationState] = useState({
    message: null,
    color: 'red'
  })

  useEffect(() => {
    personServices.getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  const notifySuccess = (message) => {
    setNotificationState(
      { message: message,
        color: 'green' })
    setTimeout(() => {
      setNotificationState(
        { message: null, color: 'red'})
    }, 2000)
  }

  const notifyError = (message) => {
    setNotificationState(
      { ...notificationState, 
        message: message})
    setTimeout(() => {
      setNotificationState(
        { ...notificationState, message: null})
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()

    if(newName === '' || newNumber === '') {
      notifyError('Name and Number fields should be filled.')
    }
    else if (persons.some(person => person.name === newName)) {
      const person = persons.find(person => person.name === newName)
      const personId = person.id

      if (confirm(`${person.name} is already exists. 
        Do you want to update the old number with the new one?`)) {
          personServices.update(personId, { ...person, number: newNumber })
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== 
                personId ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              notifySuccess('Number was successfully changed')
            })
            .catch(error => {
              notifyError(`Infromation of ${person.name} has already been removed from server.`)
              setNewName('')
              setNewNumber('')
              setPersons(persons.filter(p => p.id !== person.id))
            })
      }
    }
    else {
      const person = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      personServices.create(person)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          notifySuccess('New entry successfully added')
        })
        .catch(error => {
          alert(`New person hasn't been removed 
          for some reason. Try again.`)
        })
    }
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (confirm(`Do you really want to delete the '${person.name}'?`)) {
      personServices.deleteObject(id)
      .then(responseData => {
        setPersons(persons.filter(person => person.id !== id))
        notifySuccess(`${person.name} was successfully deleted`)
      })
      .catch(error => {
        alert(`The person hasn't been deleted for some reason.`)
      })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchReqChange = (e) => {
    setNewSearchReq(e.target.value)
  }

  const personsToShow = persons.
    filter(person => person.name.toLowerCase().includes(newSearchReq))  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationState={notificationState} />
      <Filter newSearchReq={newSearchReq} 
        handleSearchReqChange={handleSearchReqChange} 
      />
      <PersonForm 
        newName={newName} newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} 
        handleDelete={handleDeletePerson}/>
    </div>
  )
}

export default App
