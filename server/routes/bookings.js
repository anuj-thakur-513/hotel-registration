const express = require('express')
const {
  getAllBookings,
  getBookingById,
  postBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/booking')
const bookingAvailable = require('../middleware/bookingAvailable')

const bookingRouter = express.Router()

bookingRouter.get('/', getAllBookings)
bookingRouter.get('/:id', bookingAvailable, getBookingById)
bookingRouter.post('/', postBooking)
bookingRouter.put('/:id', bookingAvailable, updateBooking)
bookingRouter.delete('/:id', bookingAvailable, deleteBooking)

module.exports = bookingRouter
