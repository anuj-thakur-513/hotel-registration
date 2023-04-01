const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const { PORT, DB_URL } = process.env
const app = express()
// cors middleware
app.use(cors())

// bodyparser middleware
app.use(bodyParser.json())

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB is connected')
    app.listen(PORT || 5000, () => {
      console.log(`Starting server at port ${PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
