// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const request    = require('request');
const rp         = require('request-promise');
const db         = require('./database.js');
const helpers    = require('./helpers/db_helpers.js');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

app.use(cookieSession({
  name: 'session',
  keys: ['lhl']
}));


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
  console.log(bcrypt.hash('password'));
});

app.get('/register', (req, res) => {
  res.render('register');
})

app.get('/registerError', (req,res) => {
  res.render('registerError');
})

app.get("/todos", (req, res) => {
  const userId = req.session.userId;

  // const user = helpers.getUserByEmail(userId).then(user => user);

  if (userId) {

    helpers.getUserById(userId)
      .then( (results) => {
      return results})

  helpers.getUserToDos(userId)
    .then( (results) => {
      if (!results) {
          helpers.getUserById(userId)
          .then( (results) => {
          res.render("todos", {results});
        })
      } else {
          res.render("todos", {results});
      }
    });
  } else {
    res.redirect('/register')
  }

});

app.get("/home", (req, res) => {
  res.render("index");
});

app.post('/register', (req, res) => {
  let request = req.body;
  let newUser = {email: request.email, password: bcrypt.hashSync(request.password, 10), username: request.username, firstname: request.firstname, lastname: request.lastname}

  if (!request.email || !request.password || !request.username || !request.firstname || !request.lastname) {
    res.status(400).send('Please complete your registration form')
  }

  helpers.checkEmailandUser(newUser.username, newUser.email)
    .then(result => {

      if (result) {
        res.status(400).send('Username or email existed');
      } else {
        helpers.addUser(newUser);
        res.redirect(`/home`);
      }
    })
})
app.post('/loginUser', (req, res) => {
  //Does req.body.user and req.body.PW match ? redirect to /todos : DISPLAY ERROR, redirect to /login)
  helpers.getUserByEmail(req.body.email)
    .then( (user) => {

    if (user === undefined) {
      res.status(400).send('Incorrect email/password.')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.userId = user.id;
      res.redirect('/todos');
    } else {
      res.send('Incorrect password!');
    }
    // console.log(user);
  })
  .catch(e => console.error('Login Error:' , e.stack))
});

app.post('/completeToDoItem/:toDoId', (req, res) => {
  helpers.comepleteToDoItem(req.params.toDoId).then( ()=> {
    res.redirect('/todos');
  })
})

app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



