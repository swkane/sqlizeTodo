const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

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

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log("Todo List Running on 3000"));
