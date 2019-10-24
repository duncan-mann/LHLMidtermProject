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
const helpers    = require('./helpers/db_helpers.js')
const apiHelpers = require('./helpers/apiHelper.js')
const cookieSession = require('cookie-session')
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
  outputStyle: 'expanded',
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
  const userId = req.session.userId;
  if (userId) {
    res.redirect('/todos');
  } else {
    res.render('register', {password: null})
  }
});

app.get('/register', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    res.redirect('/todos');
  } else {
    let login = {password: null};
    res.render('register', login);
  }
})

app.get('/profile', (req, res) => {
  const userId = req.session.userId;

  if (userId) {
    helpers.getUserById(userId)
    .then( (results) => {
    res.render("profile", {results});
  })

 } else {
    res.redirect("/register")
  }

})

app.get("/todos", (req, res) => {
  const userId = req.session.userId;

  if (userId) {

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

app.get("/todos/:category", (req, res) =>{
  const userId = req.session.userId;
  let urlCategory = req.params.category;
  let category;
  console.log('category->', urlCategory);

  if (urlCategory === 'read') {
    category = 'books';
  } else if (urlCategory === 'watch') {
    category = 'movies';
  }  else if (urlCategory === 'eat') {
    category = 'restaurant';
  }  else if (urlCategory === 'buy') {
    category = 'product';
  }
  if (userId) {

    helpers.getToDosByCategory(userId, category)
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
})

app.get("/completed", (req, res) => {
  const userId = req.session.userId;

  if (userId) {

  helpers.getUserToDos(userId)
    .then( (results) => {
      if (!results) {
          helpers.getUserById(userId)
          .then( (results) => {
          res.render("completedItems", {results});
        })
      } else {
          res.render("completedItems", {results});
      }
    });
  } else {
    res.redirect('/register')
  }
})

app.get("/home", (req, res) => {
  res.render("index");
});

app.get('/editToDo/:toDoId', (req, res) => {
  const userId = req.session.userId;
  const toDoId = req.params.toDoId;

  if (userId) {

    helpers.getUserById(userId)
            .then( (results) => {
            helpers.getUserToDos(userId)
                .then(toDos => {
                  let toDoItem;
                  for (each of toDos) {
                    if (each.id == toDoId) {
                       toDoItem = each;
                    }
                  }
                  let templateVars = {results, toDoItem}
                  console.log(templateVars);
                  res.render('editToDo', templateVars)
                })
                })
            } else {
            res.redirect("/register");
          }
    });


app.post('/editToDo/:toDoId', (req, res) => {
    let toDoId = req.params.toDoId;
    let request = req.body
    console.log(request);
    helpers.editToDoItem(toDoId, request.toDoItem, request.category)
      .then( ()=> {
        res.redirect('/todos');
      })
})

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
       helpers.addUser(newUser).then( (user)=> {console.log('Added user->', user)});
       helpers.getUserByEmail(newUser.email)
        .then( (user)=> {
          req.session.userId = user.id;
          res.redirect("/todos");
        });
        };
      })
    })

app.post('/loginUser', (req, res) => {
  //Does req.body.user and req.body.PW match ? redirect to /todos : DISPLAY ERROR, redirect to /login)
  console.log('email->', req.body.email);
  helpers.getUserByEmail(req.body.email)
    .then( (user) => {

    if (!req.body.email || user === undefined || !bcrypt.compareSync(req.body.password, user.password)) {
      res.render('register', {password: false});
    }

    req.session.userId = user.id;
    res.redirect('/todos');

  })
  .catch(e => console.error('Login Error:' , e.stack))
});

app.post('/completeToDoItem/:toDoId', (req, res) => {
  helpers.comepleteToDoItem(req.params.toDoId).then( ()=> {
    res.redirect('/todos');
  })
})

app.post('/editProfile', (req, res) => {
  let userId = req.session.userId;
  let userInfo = req.body;

  if (userInfo.password !== userInfo.confirm_password) {
    res.status(400).send('Confirmed password did not match.')
  }
// If passwords match, hash password and then replace it in the userInfo object.
  userInfo.password = bcrypt.hashSync(userInfo.password, 10);

  helpers.checkEmailandUser(userInfo.username, userInfo.email)
  .then(result => {

    if (result) {
      res.status(400).send('Username or email existed');
    } else {
      helpers.editProfile(userId, userInfo).then( (user)=> {
        res.redirect("/profile");
      })
    }
  })
});

app.post("/reAddItem/:toDoId", (req, res) => {
  const userId = req.session.userId;
  const toDoId = req.params.toDoId;

  if (userId) {
    helpers.reAddItem(toDoId)
      .then( ()=> {
        res.redirect('/todos')
      })
  }

})

app.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



/////////API /////////////////////


app.post('/testAPI', (req, res) => {
  const userId = req.session.userId;
  let category;
  let textInput = req.body.input; //don't forget to sanitize this!
  let descriptionEntry;

  //dummy categories
  let readArray = ['read','browse'];
  let watchArray = ['watch','see'];
  let eatArray = ['reserve','eat','eat at','drink'];
  let buyArray = ['get','buy','purchase'];

  let textInputArray = textInput.split(' ');



  if (readArray.includes(textInputArray[0].toLowerCase())){
    category = 'books';
    descriptionEntry = textInputArray.slice(1).join(' ');
    helpers.insertItemToDatabase(category, descriptionEntry, userId)
      .then( ()=> {
        res.redirect("/todos");
      });
  } else if (watchArray.includes(textInputArray[0].toLowerCase())){
    category = 'movies';
    descriptionEntry = textInputArray.slice(1).join(' ');
    helpers.insertItemToDatabase(category, descriptionEntry, userId)
      .then( ()=> {
        res.redirect("/todos");
      });
  } else if (eatArray.includes(textInputArray[0].toLowerCase())){
    category = 'restaurant';
    descriptionEntry = textInputArray.slice(1).join(' ');
    helpers.insertItemToDatabase(category, descriptionEntry, userId)
      .then( ()=> {
        res.redirect("/todos");
      });
  } else if (buyArray.includes(textInputArray[0].toLowerCase())){
    category = 'product';
    descriptionEntry = textInputArray.slice(1).join(' ');
    helpers.insertItemToDatabase(category, descriptionEntry, userId)
      .then( ()=> {
        res.redirect("/todos");
      });
  }
  else // if user does not provide a read/buy/watch/eat keyword
  {


    let wolframOptions = apiHelpers.returnWolframOptions(textInput);

    rp(wolframOptions).then((data) => {
      let typesString = data.queryresult.datatypes;

      let typesArray = typesString.split(',');
      if(typesArray.includes('TelevisionProgram') || typesArray.includes('Movie')) {
        category = 'movies';
        descriptionEntry = textInputArray.join(' ');
        helpers.insertItemToDatabase(category, descriptionEntry, userId)
          .then( ()=> {
            res.redirect("/todos");
          });
      } else if(typesArray.includes('Book') || typesArray.includes('FictionalCharacter')) {
        category = 'books';
        descriptionEntry = textInputArray.join(' ');
        helpers.insertItemToDatabase(category, descriptionEntry, userId)
          .then( ()=> {
            res.redirect("/todos");
          });
      } else if (typesArray.includes('ConsumerProductsPTE')) {
        category = 'product';
        descriptionEntry = textInputArray.join(' ');
        helpers.insertItemToDatabase(category, descriptionEntry, userId)
          .then( ()=> {
            res.redirect("/todos");
          });
      }
      else //if the textInput is not a book, movie or TV show
      {



        let yelpOptions = apiHelpers.returnYelpOptions(textInput);

        rp(yelpOptions).then((data) => {
          if(data.total > 0) {
            category = 'restaurant';
            descriptionEntry = textInputArray.join(' ');
            helpers.insertItemToDatabase(category, descriptionEntry, userId)
              .then( ()=> {
                res.redirect("/todos");
              });
          } else {
            category = 'product';
            descriptionEntry = textInputArray.join(' ');
            helpers.insertItemToDatabase(category, descriptionEntry, userId)
              .then( ()=> {
                res.redirect("/todos");
              });
          }
        }).catch( (err) => {
          console.log(err);
          res.redirect('/todos');
        })

      }
      console.log('TOTAL DATA =', data);
      console.log('TYPESSTRING = ',typesString);



    }).catch((err) => {
      console.log(err);
    });

  }


})

