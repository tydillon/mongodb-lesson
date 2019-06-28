//framework to create a server in node. Lets you create routes
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const StudentRoutes = require('./routes/students.js')

mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true
})

const app = express()
app.use(cors())
app.use(bodyParser())
app.use('/students', StudentRoutes)

//turns the app on
app.listen(8000, function() {
  console.log('Server is listening on PORT 8000')
})
