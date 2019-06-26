//framework to create a server in node. Lets you create routes
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true
})

//create a mongoose schema
const Student = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  age: {
    type: Number
  },
  photoUrl: {
    type: String
  },
  bio: {
    type: String
  }
})

//assigned the schema to the mongoose model
const Student = mongoose.model('Student', StudentSchema)

const app = express()

//define the route, then provide the
//req= incoming, res= outgoing
//Main GET / route
app.get('/', function(req, res) {
  // if you don't use the res, the browser will just spin because the app isn't 'getting' anything
  res.json({ status: 'ok', message: 'Welcome to my server hullo' })
})

app.get('/students', function(req, res) {
  res.json({ status: 'under construction' })
})

app.post('/students', function(req, res) {
  res.json({ status: 'under construction' })
})

app.get('/students/:studentId', function(req, res) {
  res.json({ studentId: req.params.studentId })
})

app.put('/students/:studentId', function(req, res) {})

app.delete('/students/:studentId', function(req, res) {})

//turns the app on
app.listen(8000, function() {
  console.log('Server is listening on PORT 8000')
})
