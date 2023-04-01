const Booking = require('../models/booking')

const getAllBookings = async (req, res) => {
  let bookings
  try {
    bookings = await Booking.find()
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBookingById = async (req, res) => {
  let bookings
  try {
    bookings = await Booking.findById(req.params.id)
    if (bookings == null) {
      res.status(404).json({ message: 'Cannot find booking' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  // if booking is not null, send it back
  res.status(200).json(bookings)
}

const postBooking = async (req, res) => {
  /**
   * Searches for existing user bookings that overlap with the requested time slot (req.body.startTime and req.body.endTime)
   * If any overlapping bookings are found, returns an error
   * Otherwise, creates a new User with the request details and saves it
   * Responds with the new User or an error message if anything went wrong
   */
  try {
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

    const booking = new Booking({
      email: req.body.email,
      roomNumber: req.body.roomNumber,
      roomType: req.body.roomType,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    })

    const newBooking = await booking.save()
    res.status(201).json(newBooking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateBooking = async (req, res) => {
  const { email, roomNumber, roomType, startTime, endTime } = req.body
  if (!email || !roomNumber || !roomType || !startTime || !endTime) {
    res.status(400).json({ message: 'Please provide all required fields' })
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        email,
        roomNumber,
        roomType,
        startTime,
        endTime,
      },
      { new: true }
    )
    res.status(200).json(updatedBooking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndRemove(req.params.id)
    res.json({ message: 'Booking deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllBookings,
  postBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
}
