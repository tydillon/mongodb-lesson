//framework to create a server in node. Lets you create routes
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Student = require('./models/Student')

mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true
})

const app = express()
app.use(bodyParser())

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
  const rawStudent = request.body

  const newStudent = new Student(rawStudent)
  //this stores it in the database
  newStudent.save()
  //can do newStudent: newStudent
  res.json({ status: 'ok', newStudent })
})

//querying the database by id, finding student, sending it back
app.get('/students/:studentId', function(req, res) {
  Student.findById(req.params.studentId).then(function(foundStudent) {
    res.json(foundStudent)
  })
})

//update a student by id
app.put('/students/:studentId', function(req, res) {
  Student.findById(req.params.studentId).then(function(foundStudent) {
    foundStudent.name = req.body.name
    foundStudent.age = req.body.age
    foundStudent.photoUrl = req.body.photoUrl
    foundStudent.bio = req.body.bio

    foundStudent.save()

    res.json(foundStudent)
  })
  //   Student.update(req.params.studentId)
})

app.delete('/students/:studentId', function(req, response) {
  Student.findByIdAndDelete(req.params.studentId).then(function(res) {
    response.json({ status: 'ok', res: res })
  })
})

//turns the app on
app.listen(8000, function() {
  console.log('Server is listening on PORT 8000')
})
