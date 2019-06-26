const mongoose = require('mongoose')

//create a mongoose schema
const StudentSchema = mongoose.Schema({
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

module.exports = Student
