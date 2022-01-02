const express = require('express');

const app = express();
const port = 9000;

// Mock data
let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

// 정적파일의 제공 , 정적파일을 public 폴더안에 넣기
app.use(express.static('public'));
app.use(express.json());

// // 루트에 get 요청이 왔을때 콜백함수가 호출된다. 인수 2개는 호출자 express가 준다.
// // req 객체 : request message를 객체화 한 결과
// // res 객체 : response message를 객체화 한 결과

// // express : 배열 또는 객체가 stringfy가 자동으로 됨
// // GET /todos
app.get('/todos', (req, res) => {
  res.send(todos); // response Message 의 body(Entity)에 담겨서 보내진다
});

app.post('/todos', (req, res) => {
  todos = [req.body, ...todos];
  res.send(todos);
});

// 모든 todos 배열의 모든 요소의 completed를 payload와 일치시킨다.
// PATCH http://localhost:9000/todos
// content-type: application/json

// {
//   "completed": true
// }

app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

/* 
PATCH http://localhost:9000/todos/4
content-type: application/json

{
  "completed": true
}
*/

app.patch('/todos/:id', (req, res) => {
  // id는 문자열이다
  const { id } = req.params;

  // payload => {content} or {completed}
  const payload = req.body;
  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

// DELETE http://localhost:9000/todos?completed=true
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

// DELETE http://localhost:9000/todos?completed=true
app.delete('/todos/', (req, res) => {
  const { completed } = req.query; // {completed: 'true'}
  todos = todos.filter(todo => todo.completed !== JSON.parse(completed));
  res.send(todos);
});

// 서버에서 계속 듣고있음
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
