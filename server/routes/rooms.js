const express = require('express')

const roomRouter = express.Router()

roomRouter.get('/', (req, res) => {
  res.send('GET /rooms')
})

module.exports = roomRouter
