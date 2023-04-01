import { createContext, useState } from 'react'
import { API_HOST } from '../Config/API'

export const bookingContext = createContext()

const BookingContextProvider = ({ children }) => {
  const [booking, setBooking] = useState([])

  // Get all the users
  const getBookings = async () => {
    // API CALL
    const response = await fetch(`${API_HOST}/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setBooking(json)
  }
  // Adding a user
  const addBooking = async (
    email,
    roomNumber,
    roomType,
    startTime,
    endTime,
    callback
  ) => {
    const response = await fetch(`${API_HOST}/bookings`, {
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
      setBooking((booking) => booking.concat(json))
      callback(true)
    }
  }

  // Deleting a user
  const deleteBooking = async (id) => {
    await fetch(`${API_HOST}/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    getBookings()
  }

  // Edit a user
  const editBooking = async (
    id,
    email,
    roomNumber,
    roomType,
    startTime,
    endTime
  ) => {
    // Logic to edit in backend
    await fetch(`${API_HOST}/bookings/${id}`, {
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

    // Logic to edit the code in the frontend
    getBookings()
  }

  return (
    <bookingContext.Provider
      value={{ booking, addBooking, deleteBooking, editBooking, getBookings }}
    >
      {children}
    </bookingContext.Provider>
  )
}

export default BookingContextProvider
