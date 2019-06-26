const page = {
  //things we want to happen on pageload
  init: function() {
    page.getStudents().then(function(students) {
      console.log('STUDENTS', students)
      page.addStudentsToPage(students.data)
    }).then(function() {
        page.initEvents()
    })
    
  },
  initEvents: function() {
    page.clickDetails()
    page.deleteStudentEvent()
  },
  clickDetails: function() {
    document.addEventListener('click', function(e) {
      e.preventDefault()
      const data = e.target.dataset
      const isMoreDetail = e.target.classList.contains('detailLink')
        //data.id contains id
      //checking to see what was actually grabbed
      //   console.log(e.target)
      //found that e.target.dataset\ contains the id
      if (isMoreDetail) {
      page.getSingleStudent(data.id).then(function(student){
          console.log(student)
      })}
    })
  },
  getSingleStudent: function(studentId) {
      return fetch(`http://localhost:8000/students/${studentId}`).then(function(student){
          return student.json()
      })
  },
  deleteStudentEvent: function() {
      const $deleteLinks = document.querySelectorAll('.deleteLink')
      $deleteLinks.forEach(function(deleteLinkDom){
        deleteLinkDom.addEventListener('click', function(e) {
            e.preventDefault()
            const data = e.target.dataset
            const isDeleteLink = e.target.classList.contains('deleteLink')
            if(isDeleteLink){
                page.deleteStudentFromApi(data.id)
            }
          })
      })
  },
  deleteStudentFromApi: function(studentId){
    return fetch(`http://localhost:800/students/${studentId}`,{method: 'DELETE'})
        .then(function(res){
            return res.json()
        })
  }
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
  }
}(
  // iife = immediately invoked function expression. keeps all of your variables from being global
  function() {
    page.init()
  }
)()
