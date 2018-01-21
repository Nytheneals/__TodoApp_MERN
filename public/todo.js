$(document).ready(() => {
  // DISPLAYING ALL TODOS
  $.getJSON('api/todos').then((data) => {
    addTodos(data);
  });

  // POSTING & CREATING A TODO (POST SUBMISSION)
  $('#todoInput').keypress((event) => {
    if (event.which == 13) {
      createTodo();
    }
  });
});

// CREATING A LIST
function addTodos(todo) {
  todo.forEach((todo) => {
    addTodo(todo);
  });
}

// ADDING A TODO (LI-S)
function addTodo(todo) {
  const newTodo = $(`<li class="task">${todo.name}</li>`);
  // CHECKING WHETHER ITS COMPLETED
  if (todo.completed) {
    newTodo.addClass('done');
  }
  // APPEND LI TO UL
  $('.list').append(newTodo);
}

// CREATING A TODO FROM A FORM VALUE

function createTodo() {
  const userInput = $('#todoInput').val();
  // SEND A POST REQUEST TO CREATE A NEW TODO
  $.post('/api/todos', { name: userInput })
    .then((newTodo) => {
      $('#todoInput').val(' ');
      addTodo(newTodo);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DELETE
// UPDATE
