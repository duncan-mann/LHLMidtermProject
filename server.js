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
const db         = require('./database.js');
const helpers    = require('./helpers/db_helpers.js')


const users = {
  "aJ48lWF": {
    id: "aJ48lWF",
    email: "user@example.com",
    password: "$2b$10$l18tZ4mpGC2AA0D0NjO79.GSbaJgC2gyG4oRjK8Dg1Q.Pe0gpmbFy"
  },
  "user2RandomID": {
    id: "aJ48lW",
    email: "user2@example.com",
    password: "$2b$10$ZGi.0nqXV0.SPMGu1JWcv.AW6753pOidA5dWQexHJ7x5Uho4Jrkj2"
  },
};


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
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/register', (req,res) => {
  res.render('register');
})

app.get("/todos", (req, res) => {
  
  helpers.getUserToDos(2)
    .then( (results) => {
      const toDos = {results};
      res.render("todos", toDos);
      console.log(toDos)
    });
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.post('/loginUser', (req, res) => {
  //Does req.body.user and req.body.PW match ? redirect to /todos : DISPLAY ERROR, redirect to /login)
  helpers.getUserByEmail(req.body.email)
    .then( (user) => {

    if (req.body.password === user.password) {
      res.redirect('/todos');
    } else {
      res.send('Incorrect password!');
    }
    console.log(user);
  })
  .catch(e => console.error('Login Error:' , e.stack))
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



