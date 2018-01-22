// CODE IN THE (DOCUMENT).(READY) WILL RUN AFTER PAGE LOADS
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

  // DELETE REQUEST (REMOVETODO -> FUNCTION)
  $('.list').on('click', 'span', function (e) {
    e.stopPropagation();
    removeTodo($(this).parent());
  });

  // UPDATE
  $('.list').on('click', 'li', function () {
    updateTodo($(this));
  });
});

// END OF (DOCUMENT).(READY) CODE.

// CREATING A LIST OF TODOS
function addTodos(todo) {
  todo.forEach((todo) => {
    addTodo(todo);
  });
}

// CREATING A TODO (LI)..
function addTodo(todo) {
  const newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
  // ATTACHING DATA TO LI (.DATA() IS A JQUERY METHOD USED TO STORE METADATA)
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
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
      $('#todoInput').val(' '); // PLACE HOLDER BACK TO NORMAL.
      addTodo(newTodo);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DELETE FUNCTION
function removeTodo(todo) {
  const clickedId = todo.data('id');
  const deleteUrl = `/api/todos/${clickedId}`;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl,
  })
    .then((data) => {
      todo.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// UPDATE FUNCTION
function updateTodo(todo) {
  // const clickId = todo.data('id');
  const updateUrl = `/api/todos/${todo.data('id')}`;
  const isDone = !todo.data('completed');
  const updateData = { completed: isDone };
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData,
  })
    .then((updatedTodo) => {
      todo.toggleClass('done');
      todo.data('completed', isDone);
    })
    .catch((err) => {
      console.log(err);
    });
}
