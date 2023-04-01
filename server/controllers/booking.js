const Booking = require('../models/booking')
require('dotenv').config()
// const mailgun = require('mailgun-js')

// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILDUN_DOMAIN,
// })

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
  try {
    const booking = new Booking({
      email: req.body.email,
      roomNumber: req.body.roomNumber,
      roomType: req.body.roomType,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    })

    const newBooking = await booking.save()
    // await transporter.sendMail({
    //   to: req.body.email,
    //   from: 'YOUR_SENDGRID_VERIFIED_EMAIL',
    //   subject: 'Email conformation of your booking',
    //   html: `
    //                 <p>Your Room Number: ${req.body.roomNumber}</p>
    //                 <p>Your Room Type: ${req.body.roomType}</p>`,
    // })

    // const data = {
    //   from: 'Best Hotel <nityam0213@gmail.com>',
    //   to: `${req.body.email}`,
    //   subject: 'Email conformation of your booking',
    //   html: `
    //                   <p>Your Room Number: ${req.body.roomNumber}</p>
    //                 <p>Your Room Type: ${req.body.roomType}</p>`,
    // }
    // await mg.messages().send(data, function (error, body) {
    //   //
    // })

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
