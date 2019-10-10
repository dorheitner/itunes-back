const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Contect To Mongo Database
const mongoConnect = require('./helpers/database').mongoConnect
const User = require('./models/user')

// Handle Requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Import Routes
const SearchRequests = require('./routes/searchRequests')
const Itunes = require('./routes/intunes')
const Auth = require('./routes/auth')

app.use(bodyParser.json())

// app.use((req, res, next) => {
//   User.findById('5d9e28c4bfff6137e450af93').then(user => {
//     req.user = user
//     next()
//   })
// })

// Use
app.use('/requests', SearchRequests)
app.use('/itunes', Itunes)
app.use('/', Auth)

// Handle Errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

mongoConnect(() => {
  app.listen(3001)
})
