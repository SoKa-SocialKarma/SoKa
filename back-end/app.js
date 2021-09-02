// DEPENDENCIES
const cors = require('cors')
const express = require('express')
const path = require('path')

// CONFIGURATION
const app = express()
const usersController = require('./controllers/usersController')
const feedController = require('./controllers/feedController')

// MIDDLEWARE
app.use(cors())
app.use(express.json()) // Parse incoming JSON

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/doc.html'))
  res.status(200).send("Welcome to the SoKA API")
})

app.use('/users', usersController)
app.use('/feed', feedController)

app.get('*', (req, res) => {
  res.status(404).send('Page not found.')
})

// EXPORT
module.exports = app