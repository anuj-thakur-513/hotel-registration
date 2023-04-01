const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const { PORT } = process.env

const app = express()

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
