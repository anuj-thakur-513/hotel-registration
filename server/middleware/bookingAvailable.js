const Booking = require('../models/booking')

const bookingAvailable = async (req, res, next) => {
  // Check if the booking is available by findind with booking id
  // If it is available, call next()
  // If it is not available, send a 400 status code and a message "Booking is not available"

  let booking
  try {
    booking = await Booking.findById(req.params.id)
    if (booking == null) {
      return res.status(404).json({ message: 'Booking is not available' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  next()
}

module.exports = bookingAvailable
