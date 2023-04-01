import UserContext from './userContext'
import { useState } from 'react'

const UserState = (props) => {
  const host = 'http://localhost:8000/api/v1'
  const [users, setUsers] = useState([])

  // Get all the users
  const getUsers = async () => {
    // API CALL
    const response = await fetch(`${host}/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setUsers(json)
  }
  // Adding a user
  const addUser = async (
    email,
    roomNumber,
    roomType,
    startTime,
    endTime,
    callback
  ) => {
    const response = await fetch(`${host}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        roomNumber,
        roomType,
        startTime,
        endTime,
      }),
    })
    if (response.status === 409) {
      callback(false)
    } else {
      const json = await response.json()
      console.log(json)
      setUsers(users.concat(json))
      callback(true)
    }
  }

  // Deleting a user
  const deleteUser = async (id) => {
    await fetch(`${host}/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    getUsers()
  }

  // Edit a user
  const editUser = async (
    id,
    email,
    roomNumber,
    roomType,
    startTime,
    endTime
  ) => {
    // Logic to edit in backend
    await fetch(`${host}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        roomNumber,
        roomType,
        startTime,
        endTime,
      }),
    })
      .then(() => getUsers())
      .catch((error) => {
        console.log(error)
      })

    // Logic to edit the code in the frontend
  }

  return (
    <UserContext.Provider
      value={{ users, addUser, deleteUser, editUser, getUsers }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
export default UserState
