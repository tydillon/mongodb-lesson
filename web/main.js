const page = {
  //things we want to happen on pageload
  init: function() {
    page
      .getStudents()
      .then(students => page.addStudentsToPage(students.data))
      .then(page.initEvents())
      .then(() => {
        page.hideAllModals()
        page.showStudents()
      })
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
      const isEditLink = e.target.classList.contains('editLink')
      const submitButton = e.target.classList.contains('submit')
      const closeButton = e.target.classList.contains('close')
      const editButton = e.target.classList.contains('edit')
      if (isMoreDetail) {
        page.getSingleStudent(data.id).then(function(student) {
          page.showADetailModal(student._id)
        })
      }
      if (isDeleteLink) {
        page.deleteStudentFromApi(data.id)
        console.log('deleted')
      }
      if (isEditLink) {
        page.showAnEditModal(data.id)
      }
      if (submitButton) {
        page.postNewStudent(page.extractFormData())
        console.log('posted')
      }
      if (e.target.id === 'viewStudents') {
        page.showStudents()
      }
      if (e.target.id === 'viewForm') {
        page.showForm()
      }
      if (closeButton) {
        page.hideAllModals()
        page.clearStudents()
        page
          .getStudents()
          .then(students => page.addStudentsToPage(students.data))
      }
      if (editButton) {
        // page.editStudent(page.extractFormData())
        page.editStudent(page.extractEditFormData(data.id))
        console.log('edited')
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
  //API calls
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
  },
  singleStudentTemplate: function(student) {
    return `<div data-id=${student._id}>
    <h3>${student.name}</h3>
    <a class="detailLink" href="#" data-id=${student._id}>More Details</a>
    <a class="deleteLink" href="#" data-id=${student._id}>Delete</a>
    <a class="editLink" href="#" data-id=${student._id}>Edit</a>
    <div class="modal" id="modal_${student._id}">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h1>${student.name}</h1>
        <img src="${student.photoUrl}">
        <p>${student.age}</p>
        <p>${student.bio}</p>
    </div>
    </div>
    <div class="modal" id="edit_${student._id}" data-id="${student._id}">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h1>Edit ${student.name}</h1>
        <p>id: <span id="student-id">${student._id}</span></p>
        <form>
          Name: <input type="text" name="name" class="id_${
            student._id
          }" placeholder="Name" value="${student.name}" /><br>
          Age: <input type="text" name="age" class="id_${
            student._id
          }" placeholder="Age" value="${student.age}" /><br>
          Photo URL: <input type="text" name="photoUrl" class="id_${
            student._id
          }" placeholder="Photo URL" value="${student.photoUrl}" /><br>
          Bio: <textarea name="bio" class="id_${student._id}" value="">${
      student.bio
    }</textarea><br>
          <input type="submit" value="Edit Student" class="edit" data-id="${
            student._id
          }" />
        </form>
    </div>
    </div>
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
    const name = document.querySelector(`[name="name"]`).value
    const age = document.querySelector(`[name="age"]`).value
    const photoUrl = document.querySelector(`[name="photoUrl"]`).value
    const bio = document.querySelector(`[name="bio"]`).value
    const newStudent = {
      name: name,
      age: age,
      photoUrl: photoUrl,
      bio: bio
    }
    return newStudent
  },
  extractEditFormData: function(id) {
    const name = document.querySelector(`[name="name"][class="id_${id}"]`).value
    const age = document.querySelector(`[name="age"][class="id_${id}"]`).value
    const photoUrl = document.querySelector(
      `[name="photoUrl"][class="id_${id}"]`
    ).value
    const bio = document.querySelector(`[name="bio"][class="id_${id}"]`).value
    const newStudent = {
      _id: id,
      name: name,
      age: age,
      photoUrl: photoUrl,
      bio: bio
    }
    return newStudent
  },
  editStudent: function(student) {
    return fetch(`http://localhost:8000/students/${student._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(student)
    })
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
        return console.log('Edited Student!')
      })
  },
  //showing and hiding elements
  showStudents: function() {
    document.getElementById('students').style.display = 'block'
    document.getElementById('addForm').style.display = 'none'
  },
  showForm: function() {
    document.getElementById('students').style.display = 'none'
    document.getElementById('addForm').style.display = 'block'
  },
  hideAllModals: function() {
    const $modals = document.querySelectorAll('.modal')
    $modals.forEach(modal => (modal.style.display = 'none'))
  },
  showADetailModal: function(studentId) {
    document.getElementById(`modal_${studentId}`).style.display = 'block'
  },
  showAnEditModal: function(studentId) {
    document.getElementById(`edit_${studentId}`).style.display = 'block'
  },
  clearStudents: function() {
    document.querySelector('#studentList').innerHTML = ''
  }
} // iife = immediately invoked function expression. keeps all of your variables from being global

;(function() {
  page.init()
})()
