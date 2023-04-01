import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { alertContext } from '../Context/AlertContext'
import { bookingContext } from '../Context/BookingContext'

const AddBooking = () => {
  const [booking, setBooking] = useState({
    email: '',
    roomNumber: '',
    roomType: '',
    startTime: '',
    endTime: '',
  })
  const { addBooking } = useContext(bookingContext)
  const { showAlert } = useContext(alertContext)
  let navigate = useNavigate()

  const callback = (flag) => {
    if (!flag) {
      showAlert(
        'There is already a booking for this room in the time slot',
        'danger'
      )
    } else {
      let startTime = Date.parse(booking.startTime)
      let endTime = Date.parse(booking.endTime)
      let timeDiff = endTime - startTime // difference between current time and start time in milliseconds
      let hoursDiff = timeDiff / (1000 * 60 * 60) // difference in hours
      let price
      if (booking.roomType === 'A') {
        price = hoursDiff * 100
      } else if (booking.roomType === 'B') {
        price = hoursDiff * 80
      } else {
        price = hoursDiff * 50
      }
      price = Math.round(price)
      showAlert(
        `Successfully booked and the price would be ₹ ${price}`,
        'success'
      )
      navigate('/')
    }
    setBooking({
      email: '',
      roomNumber: '',
      roomType: '',
      startTime: '',
      endTime: '',
    })
  }
  const onClickHandler = async (e) => {
    addBooking(
      booking.email,
      booking.roomNumber,
      booking.roomType,
      booking.startTime,
      booking.endTime,
      callback
    )
  }
  const onChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value })
  }
  return (
    <div style={{ marginTop: '70px' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h3>
            <strong>Add New Booking</strong>
          </h3>
          <p className="text-muted">
            Complete the form below to add a new booking
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center ">
        <div style={{ width: '50vw', minWidth: '300px' }}>
          <div className="row">
            <div className="col">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={booking.email}
                onChange={onChange}
              />
            </div>
            <div className="col">
              <label className="form-label">Room number:</label>
              <input
                type="text"
                className="form-control"
                name="roomNumber"
                placeholder="Room number"
                value={booking.roomNumber}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Room Type:</label>
              <select
                className="form-select"
                name="roomType"
                value={booking.roomType}
                onChange={onChange}
              >
                <option value="">Select Room Type</option>
                <option value="A">A: 100 Rs/hr</option>
                <option value="B">B: 80 Rs/hr</option>
                <option value="C">C: 50 Rs/hr</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">Start Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="startTime"
                placeholder="Start Time"
                value={booking.startTime}
                onChange={onChange}
              />
            </div>
            <div className="col">
              <label className="form-label">End Time:</label>
              <input
                type="datetime-local"
                className="form-control"
                name="endTime"
                placeholder="End Time"
                value={booking.endTime}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center my-2">
            <button
              type="submit"
              disabled={
                booking.email.length === 0 ||
                booking.roomNumber.length === 0 ||
                booking.roomType.length === 0 ||
                booking.startTime.length === 0 ||
                booking.endTime.length === 0 ||
                Date.parse(booking.startTime) > Date.parse(booking.endTime)
              }
              className="btn btn-success"
              name="submit"
              onClick={onClickHandler}
            >
              Save
            </button>
            <Link className="btn btn-danger mx-2" to="/">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBooking
