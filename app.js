const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require('./models');

// create web app
const app = express();

// connecting the style sheet
app.use(express.static('public'));

// parsing the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// Index action
app.get('/', function(req, res) {
  models.Todo.findAll().then(function(todos){
    res.render('index', {todos: todos});
  });
});

// Create
app.post('/', (req, res) => {
  let todoData = {
    task: req.body.task,
    isComplete: false
  };
  models.Todo.create(todoData).then(function(promise){
    res.redirect('/');
  })
});

//Complete
app.post('/complete/:id', function(req, res) {
  models.Todo.findById(req.params.id).then(function(todo) {
    todo.update({isComplete: true}).then(() => res.redirect('/'));
  });
});

// Edit a Todo

app.get('/edit/:id', (req, res) => {
//   let todo = models.Todo.findById(req.params.id).then((doc) =>
// console.log(doc););
//   console.log(todo);
  res.render('edit', {id: req.params.id});
});
app.post('/edit/:id', (req, res) => {
  models.Todo.findById(req.params.id).then((todo) => {
    todo.update({task: req.body.task}).then(() => res.redirect('/'));
  });
});

//Delete

app.get('/delete/:id', function(req, res) {
  models.Todo.findById(req.params.id).then(function(todo) {
    todo.destroy().then(() => res.redirect('/'));
  });
});

app.listen(3000, () => console.log("Todo List Running on 3000"));
