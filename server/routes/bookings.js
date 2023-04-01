const express = require('express')
const {
  getAllBookings,
  getBookingById,
  postBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/booking')
const bookingAvailable = require('../middleware/bookingAvailable')
const bookingConflict = require('../middleware/bookingConflict')

const bookingRouter = express.Router()

bookingRouter.get('/', getAllBookings)
bookingRouter.get('/:id', bookingAvailable, getBookingById)
bookingRouter.post('/', bookingConflict, postBooking)
bookingRouter.put('/:id', bookingConflict, updateBooking)
bookingRouter.delete('/:id', bookingAvailable, deleteBooking)

module.exports = bookingRouter
