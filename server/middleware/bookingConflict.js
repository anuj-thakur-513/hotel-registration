const Booking = require('../models/booking')

const bookingConflict = async (req, res, next) => {
  /**
   * Searches for existing user bookings that overlap with the requested time slot (req.body.startTime and req.body.endTime)
   * If any overlapping bookings are found, returns an error
   * Otherwise, creates a new User with the request details and saves it
   * Responds with the new User or an error message if anything went wrong
   */
  const existingBooking = await Booking.find({
    roomNumber: req.body.roomNumber,
    $or: [
      {
        $and: [
          { startTime: { $lte: req.body.startTime } },
          { endTime: { $gt: req.body.startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lt: req.body.endTime } },
          { endTime: { $gte: req.body.endTime } },
        ],
      },
      {
        $and: [
          { startTime: { $gte: req.body.startTime } },
          { endTime: { $lte: req.body.endTime } },
        ],
      },
    ],
  })

  if (existingBooking.length !== 0) {
    return res.status(409).json({
      message:
        'There is already a booking for this room during the selected time period.',
    })
  }
  next()
}

module.exports = bookingConflict
