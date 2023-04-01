import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import BookingTime from '../Components/BookingTime'
import Filter from '../Components/Filter'
import Table from '../Components/Table'
import TimeFilter from '../Components/TimeFilter'
import { alertContext } from '../Context/AlertContext'

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [bookings, setBookings] = useState('upcoming')
  const [filterStartTime, setFilterStartTime] = useState('')
  const [filterEndTime, setFilterEndTime] = useState('')

  const { showAlert } = useContext(alertContext)

  function setFilter(option, value) {
    setSelectedOption(option)
    setInputValue(value)
  }
  function setBookingTime(dropdown) {
    setBookings(dropdown)
    console.log(dropdown)
  }
  function setFilterBookingTime(start, end) {
    setFilterStartTime(start)
    setFilterEndTime(end)
  }
  return (
    <>
      <div className="container-fluid" style={{ marginTop: '70px' }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <Link className="btn btn-success mb-3 my-" to="/booking">
              Add Booking
            </Link>
            <BookingTime setBookingTime={setBookingTime} />
          </div>
          <TimeFilter setFilterBookingTime={setFilterBookingTime} />
          <Filter setFilter={setFilter} />
        </div>
      </div>
      <Table
        selectedOption={selectedOption}
        inputValue={inputValue}
        showAlert={showAlert}
        bookings={bookings}
        filterStartTime={filterStartTime}
        filterEndTime={filterEndTime}
      />
    </>
  )
}

export default Home
