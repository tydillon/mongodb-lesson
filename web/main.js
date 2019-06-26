const page = {
  //things we want to happen on pageload
  init: function() {
    page.getStudents().then(function(students) {
      console.log('STUDENTS', students)
      page.addStudentsToPage(students.data)
    })
    page.initEvents()
  },
  initEvents: function() {
    page.clickDetails()
  },
  clickDetails: function() {
    document.addEventListener('click', function(e) {
      e.preventDefault()
      //checking to see what was actually grabbed
      //   console.log(e.target)
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
    <a class="detailLink" href="${student._id}">More Details</a>
    </div>`
  }
}(
  // iife = immediately invoked function expression. keeps all of your variables from being global
  function() {
    page.init()
  }
)()
