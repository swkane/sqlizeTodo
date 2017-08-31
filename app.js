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


app.get('/', function(req, res) {
  models.Todo.findAll().then(function(todos){
    res.render('index', {todos: todos});
  });
});

app.post('/', (req, res) => {
  let todoData = {
    task: req.body.task,
    isComplete: false
  };
  models.Todo.create(todoData).then(function(promise){
    res.redirect('/');
  })
})

app.listen(3000, () => console.log("Todo List Running on 3000"));
