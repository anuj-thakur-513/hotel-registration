const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', bookingSchema)
