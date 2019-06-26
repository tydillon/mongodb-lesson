const express = require('express')
const Student = require('../models/Student')
const router = express.Router

// /students
router
  .route('/')
  .get(function(req, res) {
    Student.find({}).then(function(students) {
      res.json({ status: 'ok', data: students })
    })
  })
  .post(function(req, res) {})

// /students/:studentId
router
  .route('/:studentId')
  .get(function(req, res) {})
  .put(function(req, res) {})
  .delete(function(req, res) {})

module.exports = router
