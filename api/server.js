//framework to create a server in node. Lets you create routes
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true
})

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

//turns the app on
app.listen(8000, function() {
  console.log('Server is listening on PORT 8000')
})
