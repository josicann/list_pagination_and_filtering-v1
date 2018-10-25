/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// global variable / selected DOM elements
const page = document.querySelector('.page');
const studentList = document.querySelector('.student-list');
const students = studentList.children;
const pageHeader = document.querySelector('.page-header.cf');
const paginationDiv = document.createElement('DIV');
const studentUl = document.createElement('UL');
page.appendChild(paginationDiv);
paginationDiv.appendChild(studentUl);
paginationDiv.className = 'pagination';

// pagination functions below
// hides students according to textContent of active pagination link
function hideStudents(activeLink, list) {
  for(let j = 0; j < students.length; j++) {
    students[j].style.display = 'none';
  };

  for (let i = 0; i < list.length; i++ ) {
    if ( i  + 1 > activeLink * 10 ||  i + 1 < activeLink * 10 - 9) {
      list[i].style.display = 'none';
    }else {
      list[i].style.display = 'block';
    };
  };
}

// creates and adds pagination links to the DOM
function createPageLinks(list) {
  let listItemString = '';
  for (let i = 0; i < Math.ceil(list.length/10); i++) {
    let linkNum = i + 1;
    listItemString += '<li><a href="#">'+linkNum+'</a></li>';
    };
    studentUl.innerHTML = listItemString;
    document.querySelector('.pagination ul li a').className = 'active';
  }

//click event for pagination link sets current link to active and calls hideStudents
function activateLinks(list) {
  createPageLinks(list);
  let pageLinks = document.getElementsByTagName('a');
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener('click', (e) => {
      document.querySelector('.active').className = '';
      e.target.className = 'active';
      hideStudents(e.target.textContent, list);
    });
  }
}
// end of pagination function declarations
//searching functions below
function createSearchbar() {
  let div = document.createElement('DIV');
  let input = document.createElement('INPUT');
  let button = document.createElement('BUTTON');
  pageHeader.appendChild(div);
  div.appendChild(input);
  div.appendChild(button);
  div.className = 'student-search';
  input.placeholder = 'Search for students...';
  button.textContent = 'Search';
}
/*initial function calls to set up page:
only show students from 1 - 10, create pagination links, activate links and set link 1 as active */
hideStudents(1, students);
activateLinks(students);
createSearchbar();

//selecting search button and input
const searchButton = document.querySelector('.student-search').children[1];
const searchInput = document.querySelector('.student-search').children[0];

//adding event to seachButton
searchButton.addEventListener('click', () => {
  let foundStudents = [];
  for (let i = 0; i < students.length; i++ ) {
    let studentName = students[i].children[0].children[1].textContent;
    let studentEmail = students[i].children[0].children[2].textContent;
    if (studentName.includes(searchInput.value) || studentEmail.includes(searchInput.value) ) {
      foundStudents.push(students[i]);
    };
  };
  if(foundStudents.length === 0) {
    let studentList = document.querySelector('.student-list').innerHTML;
    document.querySelector('.student-list').innerHTML = '<h1>No results found</h1>';
    setTimeout(() => {document.querySelector('.student-list').innerHTML = studentList;}, 3000);
  }else {
    activateLinks(foundStudents);
    hideStudents(1, foundStudents);
  };
})
