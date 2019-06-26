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
//SOMETHING IS WRONG HERE
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
  //Student connects to Mongo. Find is pulling it out from Mongo, then students comes back
  //Server sends it back as JSON to the browser
  Student.find({}).then(function(students) {
    res.json({ status: 'ok', data: students })
  })
})

//this is hard coded. We want to change this
app.post('/students', function(req, res) {
  const newStudent = new Student({
    name: 'Calvin',
    age: 39,
    photoUrl:
      'data:image/jpeg;base64,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',
    bio: 'I like javascript.'
  })
  //this stores it in the database
  newStudent.save()
  //can do newStudent: newStudent
  res.json({ status: 'ok', newStudent })
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
