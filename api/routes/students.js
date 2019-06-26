const express = require('express')
const Student = require('../models/Student')
const router = express.Router()

// /students
router
  .route('/')
  .get(function(req, res) {
    Student.find({}).then(function(students) {
      res.json({ status: 'ok', data: students })
    })
  })
  .post(function(req, res) {
    const rawStudent = req.body

    const newStudent = new Student(rawStudent)
    //this stores it in the database
    newStudent.save()
    //can do newStudent: newStudent
    res.json({ status: 'ok', newStudent })
  })

// /students/:studentId
router
  .route('/:studentId')
  .get(function(req, res) {
    Student.findById(req.params.studentId).then(function(foundStudent) {
      res.json(foundStudent)
    })
  })
  .put(function(req, res) {
    Student.findById(req.params.studentId).then(function(foundStudent) {
      foundStudent.name = req.body.name
      foundStudent.age = req.body.age
      foundStudent.photoUrl = req.body.photoUrl
      foundStudent.bio = req.body.bio

      foundStudent.save()

      res.json(foundStudent)
    })
  })
  .delete(function(req, response) {
    Student.findByIdAndDelete(req.params.studentId).then(function(res) {
      response.json({ status: 'ok', res: res })
    })
  })

module.exports = router
