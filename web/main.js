const page = {
  //things we want to happen on pageload
  init: function() {
    page
      .getStudents()
      .then(students => page.addStudentsToPage(students.data))
      .then(page.initEvents())
  },
  initEvents: function() {
    page.clickOptions()
  },
  clickOptions: function() {
    document.addEventListener('click', function(e) {
      e.preventDefault()
      const data = e.target.dataset
      const isMoreDetail = e.target.classList.contains('detailLink')
      const isDeleteLink = e.target.classList.contains('deleteLink')
      const submitButton = e.target.classList.contains('submit')
      if (isMoreDetail) {
        page.getSingleStudent(data.id).then(function(student) {
          console.log(student)
        })
      }
      if (isDeleteLink) {
        page.deleteStudentFromApi(data.id)
        console.log('deleted')
      }
      if (submitButton) {
        page.postNewStudent(page.extractFormData())
      }
    })
  },
  getSingleStudent: function(studentId) {
    return fetch(`http://localhost:8000/students/${studentId}`).then(function(
      student
    ) {
      return student.json()
    })
  },
  deleteStudentFromApi: function(studentId) {
    return fetch(`http://localhost:8000/students/${studentId}`, {
      method: 'DELETE'
    }).then(function(res) {
      return res.json()
    })
  },
  //other things
  getStudents: function() {
    return fetch('http://localhost:8000/students')
      .then(function(students) {
        return students.json()
      })
      .catch(e => console.log('Error', e))
  },
  addStudentsToPage: function(students) {
    let html = '<ul>'
    students.forEach(function(student) {
      html += `<li>${page.singleStudentTemplate(student)}</li>`
    })
    html += '</ul>'
    const $studentsList = document.querySelector('#studentList')
    $studentsList.innerHTML = html
    console.log(html)
  },
  singleStudentTemplate: function(student) {
    return `<div data-id=${student._id}>
    <h3>${student.name}</h3>
    <img src="${student.photoUrl}">
    <p>${student.bio}</p>
    <a class="detailLink" href="#" data-id=${student._id}>More Details</a>
    <a class="deleteLink" href="#" data-id=${student._id}>Delete</a>
    </div>`
  },
  postNewStudent: function(newStudent) {
    return fetch(`http://localhost:8000/students/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newStudent)
    })
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        return console.log('Created Student!')
      })
  },
  extractFormData: function() {
    const name = document.querySelector('[name="name"]').value
    const age = document.querySelector('[name="age"]').value
    const photoUrl = document.querySelector('[name="photoUrl"]').value
    const bio = document.querySelector('[name="bio"]').value
    const newStudent = {
      name: name,
      age: age,
      photoUrl: photoUrl,
      bio: bio
    }
    return newStudent
  },
  editStudent: function() {
    return fetch(`http://localhost:8000/students/${student._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newStudent)
    })
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        return console.log('Edited Student!')
      })
  }
} // iife = immediately invoked function expression. keeps all of your variables from being global

;(function() {
  page.init()
})()
