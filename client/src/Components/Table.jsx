import { useContext, useEffect, useRef, useState } from 'react'
import { alertContext } from '../Context/AlertContext'
import { bookingContext } from '../Context/BookingContext'

import TableItem from './TableItem'
export default function Table(props) {
  const { booking, deleteBooking, editBooking, getBookings } =
    useContext(bookingContext)
  const { showAlert } = useContext(alertContext)
  const [user, setUser] = useState({
    id: '',
    eEmail: '',
    eRoomNumber: '',
    eRoomType: '',
    eStartTime: '',
    eEndTime: '',
  })
  const [delUser, setDelUser] = useState({
    id: '',
    roomType: '',
    delStartTime: '',
    delEndTime: '',
  })
  const {
    selectedOption,
    inputValue,
    bookings,
    filterStartTime,
    filterEndTime,
  } = props
  useEffect(() => {
    getBookings()
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const delRef = useRef(null)
  const delRefClose = useRef(null)
  const onClickHandler = (e) => {
    editBooking(
      user.id,
      user.eEmail,
      user.eRoomNumber,
      user.eRoomType,
      user.eStartTime,
      user.eEndTime
    )
    refClose.current.click()
    let startTime = Date.parse(user.eStartTime)
    let endTime = Date.parse(user.eEndTime)
    let timeDiff = endTime - startTime // difference between current time and start time in milliseconds
    let hoursDiff = timeDiff / (1000 * 60 * 60) // difference in hours
    let price
    if (user.eRoomType === 'A') {
      price = hoursDiff * 100
    } else if (user.eRoomType === 'B') {
      price = hoursDiff * 80
    } else {
      price = hoursDiff * 50
    }
    price = Math.round(price)
    showAlert(`Edited Successfully! The updated price is ₹ ${price}`, 'success')
  }
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const updateUser = (currentUser) => {
    ref.current.click()
    setUser({
      id: currentUser._id,
      eEmail: currentUser.email,
      eRoomNumber: currentUser.roomNumber,
      eRoomType: currentUser.roomType,
      eStartTime: currentUser.startTime,
      eEndTime: currentUser.endTime,
    }) // Will set the edit fields to the current value before editing
  }
  function onDeleteIcon(currentUser) {
    //updateUser
    delRef.current.click()
    setDelUser({
      id: currentUser._id,
      roomType: currentUser.roomType,
      delStartTime: currentUser.startTime,
      delEndTime: currentUser.endTime,
    })
  }
  const onDelClickHandler = (e) => {
    //onClickHandler
    deleteBooking(delUser.id)
    delRefClose.current.click()
    showAlert('Removed booking', 'danger')
  }
  return (
    <>
      {/* Delete User Start */}
      <button
        ref={delRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <strong>Remove Booking</strong>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h5>
                  <strong>
                    {(Date.parse(delUser.delStartTime) - Date.now()) /
                      (1000 * 60 * 60) >
                    48
                      ? 'Complete Refund'
                      : (Date.parse(delUser.delStartTime) - Date.now()) /
                          (1000 * 60 * 60) >=
                          24 &&
                        (Date.parse(delUser.delStartTime) - Date.now()) /
                          (1000 * 60 * 60) <=
                          48
                      ? '50% refund'
                      : 'No refund'}
                  </strong>
                </h5>
                {`The amount that will be refunded is ₹ ${
                  (delUser.roomType === 'A'
                    ? ((Date.parse(delUser.delEndTime) -
                        Date.parse(delUser.delStartTime)) /
                        (1000 * 60 * 60)) *
                      100
                    : delUser.roomType === 'B'
                    ? ((Date.parse(delUser.delEndTime) -
                        Date.parse(delUser.delStartTime)) /
                        (1000 * 60 * 60)) *
                      80
                    : ((Date.parse(delUser.delEndTime) -
                        Date.parse(delUser.delStartTime)) /
                        (1000 * 60 * 60)) *
                      50) *
                  ((Date.parse(delUser.delStartTime) - Date.now()) /
                    (1000 * 60 * 60) >
                  48
                    ? 1
                    : (Date.parse(delUser.delStartTime) - Date.now()) /
                        (1000 * 60 * 60) >=
                        24 &&
                      (Date.parse(delUser.delStartTime) - Date.now()) /
                        (1000 * 60 * 60) <=
                        48
                    ? 0.5
                    : 0)
                }`}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                ref={delRefClose}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDelClickHandler}
              >
                Remove Booking
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete User End */}

      {/* Edit User */}

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <strong>Edit Booking Information</strong>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="eEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="eEmail"
                  id="eEmail"
                  onChange={onChange}
                  value={user.eEmail}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eRoomNumber" className="form-label">
                  Room Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="eRoomNumber"
                  id="eRoomNumber"
                  onChange={onChange}
                  value={user.eRoomNumber}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eRoomType" className="form-label">
                  Room Type
                </label>
                <select
                  className="form-select"
                  name="eRoomType"
                  value={user.eRoomType}
                  onChange={onChange}
                >
                  <option value="">Select Room Type</option>
                  <option value="A">A: 100 Rs/hr</option>
                  <option value="B">B: 80 Rs/hr</option>
                  <option value="C">C: 50 Rs/hr</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="eStartTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="eStartTime"
                  id="eStartTime"
                  onChange={onChange}
                  value={user.eStartTime}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eEndTime" className="form-label">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="eEndTime"
                  id="eEndTime"
                  onChange={onChange}
                  value={user.eEndTime}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                ref={refClose}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClickHandler}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit User End */}

      <table className="table table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Email</th>
            <th scope="col">Room Number</th>
            <th scope="col">Room Type</th>
            <th scope="col">Start Time</th>
            <th scope="col">End Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {booking &&
            booking.map((user, ind) => {
              ind++
              return (
                <TableItem
                  key={user._id}
                  user={user}
                  ind={ind}
                  updateUser={updateUser}
                  showAlert={props.showAlert}
                  onDeleteIcon={onDeleteIcon}
                />
              )
            })}
        </tbody>
      </table>
      <div className="text-center">
        {booking.length === 0 && (
          <h2
            className="justify-content-center mx-2"
            style={{ color: '#9d0000' }}
          >
            <strong>No bookings yet...</strong>
          </h2>
        )}
      </div>
    </>
  )
}
