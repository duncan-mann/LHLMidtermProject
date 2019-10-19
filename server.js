// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const request    = require('request');
const rp         = require('request-promise');

//Helper function for backend and API calling;
const apiHelper = require('./helpers/apiHelper.js')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {

  res.render("index");
});

app.get("/todos", (req,res) => {
  res.redirect("/");
})

app.get('/login', (req, res) => {
  //if user exists, redirect to /todos
  //otherwise, render login.ejs
  res.send('GET /login');
})

app.get('/register', (req, res) => {
  //if user exists, redirect to /todos
  //otherwise, render register.ejs
  res.send('GET /register');
})


app.get('/todos/new', (req, res) => {
  //if user exists, render new_todo.ejs
  //otherwise redirect to /login
  res.send('GET /todos/new');
})

app.get('/todos/:id', (req, res) => {
  //does current :id belong to current user? display the details of todo WHERE id = :id
  //otherwise redirect to todos (dashboard)
  res.send(`GET /todos/${req.params.id}`);
})

app.get('/logout', (req, res) => {
  //Scrub cookies and logout
  res.send('GET /logout');
})

app.post('/login', (req, res) => {
  //Does req.body.user and req.body.PW match ? redirect to /todos : DISPLAY ERROR, redirect to /login
  res.send('POST /login');
})

app.post('/register', (req, res) => {
  // success ? redirect to /todos
  res.send('POST /register');
})

app.post('/todos', (req, res) => {
  //success ? INSERT post and redirect to Todos : error message and render new_todo.ejs
  res.send('POST /todos');
});

app.post('/todo/:id', (req, res) => {
  //User ? Update to do where id = :id and redirect to /todo/:id      :   redirect to login
  res.send(`POST /todo/${req.params.id}`);
})

app.post('/todo/:id/delete', (req, res) => {
  res.send(`POST(DELETE) /todo/${req.params.id}/delete`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get('/testFORM', (req, res) => {
  res.render('testFORM');
})

app.post('/testAPI', (req, res) => {

})

