// iife = immediately invoked function expression. keeps all of your variables from being global
;(function() {})()

const page = {
  getStudents: function() {
    return fetch('http://localhost:8000/students')
      .then(function(students) {
        return students.json()
      })
      .catch(e => console.log('Error', e))
  }
}

page.getStudents().then(function(students) {
  console.log('STUDENTS', students)
})
