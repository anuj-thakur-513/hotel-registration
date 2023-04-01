const express = require('express')
const bookingRouter = express.Router()

bookingRouter.get('/', (req, res) => {
  res.send('GET /bookings')
})

module.exports = bookingRouter
