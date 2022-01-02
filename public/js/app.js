// import request from './promise.js'; // promise version
// import request from './fetch.js'; // fetch version

const $toggleAll = document.querySelector('.toggle-all');
const $newTodo = document.querySelector('.new-todo');
const $todoList = document.querySelector('.todo-list');
const $main = document.querySelector('.main');
const $footer = document.querySelector('.footer');
const $todoCount = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');
const $clearCompleted = document.querySelector('.clear-completed');

/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} completed
 */

/** @typedef {'all'|'active'|'completed'} Filter */

/** @type {Todo[]} */
let todos = [];
/** @type {Filter} */
let currentFilter = 'all';

const render = () => {
  const _todos = todos.filter(todo =>
    currentFilter === 'completed' ? todo.completed : currentFilter === 'active' ? !todo.completed : true
  );

  $todoList.innerHTML = _todos
    .map(
      ({ id, content, completed }) => `
        <li data-id="${id}">
          <div class="view">
            <input type="checkbox" class="toggle" ${completed ? 'checked' : ''}/>
            <label>${content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>`
    )
    .join('');

  // todo의 갯수가 0이면 .main, .footer 요소를 비표시한다.
  [$main, $footer].forEach($el => $el.classList.toggle('hidden', todos.length === 0));

  const activeTodos = todos.filter(todo => !todo.completed);

  // activeTodos의 갯수가 0 또는 1개면 'n item left' todo의 갯수가 2개 이상이면 'n items left'
  $todoCount.textContent = `${activeTodos.length} ${activeTodos.length > 1 ? 'items' : 'item'} left`;

  // completed 상태인 todo가 없으면 비표시한다
  const completedTodos = todos.filter(todo => todo.completed);
  $clearCompleted.classList.toggle('hidden', completedTodos.length === 0);
};

/** @type {(_todos: Todo[]) => void} */
const setTodos = _todos => {
  todos = _todos;
  console.log('[todos]', todos);

  render();
};

/** @type {(filter: Filter) => void} */
const setFilter = filter => {
  currentFilter = filter;
  render();
};

const fetchTodos = () => {
  // request.get('/todos', setTodos);
  // 📌 Promise version
  // request.get('/todos').then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .get('/todos')
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // console.log('first rendering');
  // 📌 axios version
  axios
    .get('/todos')
    .then(({ data }) => setTodos(data))
    .catch(console.error);

  // 📌 async/await version
};

const toggleAllTodos = completed => {
  // request.patch('/todos', setTodos, { completed });

  // 📌 Promise version
  // request.patch('/todos', { completed }).then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .patch('/todos', { completed })
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .patch('/todos', { completed })
    .then(({ data }) => setTodos(data))
    .catch(console.error);

  // 📌 async/await version
};

const generateId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  // request.post('/todos', setTodos, { id: generateId(), content, completed: false });

  // 📌 Promise version
  // request.post('/todos', { id: generateId(), content, completed: false }).then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .post('/todos', { id: generateId(), content, completed: false })
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .post('/todos', { id: generateId(), content, completed: false })
    .then(({ data }) => setTodos(data))
    .catch(console.error);

  // 📌 async/await version
};

const toggleTodo = id => {
  const { completed } = todos.find(todo => todo.id === +id);
  // request.patch(`/todos/${id}`, setTodos, { completed: !completed });

  // 📌 Promise version
  // request.patch(`/todos/${id}`, { completed: !completed }).then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .patch(`/todos/${id}`, { completed: !completed })
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .patch(`/todos/${id}`, { completed: !completed })
    .then(({ data }) => setTodos(data))
    .catch(console.error);
  // 📌 async/await version
};

const updateTodoContent = (id, content) => {
  // setTodos(todos.map(todo => (todo.id === +id ? { ...todo, content } : todo)));
  // request.patch(`/todos/${id}`, setTodos, { content })

  // 📌 Promise version
  // request.patch(`/todos/${id}`, { content }).then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .patch(`/todos/${id}`, { content })
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .patch(`/todos/${id}`, { content })
    .then(({ data }) => setTodos(data))
    .catch(console.error);
  // async/await version
};

const removeTodo = id => {
  // setTodos(todos.filter(todo => todo.id !== +id));
  // request.delete(`/todos/${id}`, setTodos)

  // 📌 Promise version
  // request.remove(`/todos/${id}`).then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .delete(`/todos/${id}`)
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .delete(`/todos/${id}`)
    .then(({ data }) => setTodos(data))
    .catch(console.error);

  // async/await version
};

const removeAllCompletedTodos = () => {
  // setTodos(todos.filter(todo => !todo.completed));
  // request.remove("/todos?completed=true", setTodos)

  // 📌 Promise version
  // request.remove('/todos?completed=true').then(setTodos).catch(console.error);

  // 📌 fetch version
  // request
  //   .delete('/todos?completed=true')
  //   .then(response => {
  //     if (!response.ok) throw new Error(response.statusText);
  //     return response.json();
  //   })
  //   .then(setTodos)
  //   .catch(console.error);

  // 📌 axios version
  axios
    .delete('/todos?completed=true')
    .then(({ data }) => setTodos(data))
    .catch(console.error);

  // 📌 async/await version
};

// Event bindings
// initial rendering
window.addEventListener('DOMContentLoaded', fetchTodos);

// toggle all todo completed
$toggleAll.onchange = e => {
  toggleAllTodos(e.target.checked);
};

// add todo
$newTodo.onkeyup = e => {
  if (e.key !== 'Enter') return;

  const content = e.target.value.trim();
  if (content !== '') addTodo(content);
  e.target.value = '';
};

// toggle todo completed
$todoList.onchange = e => {
  // input text에서 change 이벤트가 발생하는 경우도 있다.
  if (!e.target.classList.contains('toggle')) return;
  // toggleTodo(e.target.parentNode.parentNode.dataset.id);
  // https://caniuse.com/?search=closest
  toggleTodo(e.target.closest('li').dataset.id);
};

// edit mode
$todoList.ondblclick = e => {
  if (!e.target.matches('.view > label')) return;
  // e.target.parentNode.parentNode.classList.add('editing');
  e.target.closest('li').classList.add('editing');
};

// update todo content
$todoList.onkeyup = e => {
  if (e.key !== 'Enter' || !e.target.classList.contains('edit')) return;
  updateTodoContent(e.target.closest('li').dataset.id, e.target.value);
  // editTodoContent에 의해 rerendering되므로 .editing을 제거할 필요가 없다.
  // e.target.closest('li').classList.remove('editing');
};

// remove todo
$todoList.onclick = e => {
  if (!e.target.classList.contains('destroy')) return;
  removeTodo(e.target.closest('li').dataset.id);
};

// filter todos
$filters.onclick = e => {
  if (!e.target.matches('.filters > li > a')) return;

  $filters.querySelectorAll('a').forEach($filter => {
    $filter.classList.toggle('selected', $filter === e.target);
  });
  // $filters.querySelector('a.selected').classList.remove('selected');
  // e.target.classList.add('selected');

  setFilter(e.target.id);
};

// remove all completed todos
$clearCompleted.onclick = removeAllCompletedTodos;
