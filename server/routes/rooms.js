const express = require('express')
const { getAllRooms, postRoom } = require('../controllers/room')

const roomRouter = express.Router()

roomRouter.get('/', getAllRooms)
roomRouter.post('/', postRoom)

module.exports = roomRouter
