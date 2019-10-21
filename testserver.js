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
  let category = [];
  let textInput = req.body.input; //don't forget to sanitize this!

  //dummy categories
  let readArray = ['read'];
  let watchArray = ['watch','see'];
  let eatArray = ['reserve','eat','eat at'];
  let buyArray = ['get','buy','purchase'];

  let textInputArray = textInput.split(' ');



  if (readArray.includes(textInputArray[0].toLowerCase())){
    category.push('read');
    let templateVars = {category: category, output: textInput};
    res.render('testRESULT', templateVars);
  } else if (watchArray.includes(textInputArray[0].toLowerCase())){
    category.push('watch');
    let templateVars = {category: category, output: textInput};
    res.render('testRESULT', templateVars);
  } else if (eatArray.includes(textInputArray[0].toLowerCase())){
    category.push('eat');
    let templateVars = {category: category, output: textInput};
    res.render('testRESULT', templateVars);
  } else if (buyArray.includes(textInputArray[0].toLowerCase())){
    category.push('buy');
    let templateVars = {category: category, output: textInput};
    res.render('testRESULT', templateVars);
  }
  else // if user does not provide a read/buy/watch/eat keyword
  {
    let wolframOptions = {
      uri: 'http://api.wolframalpha.com/v2/query',
      qs:{
        input: textInput,
        output: 'json',
        appid: '9YR6T5-RYTW4PTK83',
        ignorecase: true,
        podtimeout: '0',
        formattimeout: '0',
        translation: true,
        assumption: `C.${textInput}-_*Movie`,
        assumption: `C.${textInput}-_*Book`,
        // assumption: `C.${textInput}-_*FictionalCharacter`,
        // assumption: `C.${textInput}-_*ConsumerProductsPTE`
      },
      json:true
    }

    rp(wolframOptions).then((data) => {
      let typesString = data.queryresult.datatypes;

      let typesArray = typesString.split(',');
      if(typesArray.includes('TelevisionProgram') || typesArray.includes('Movie')) {
        category.push('watch');
        let templateVars = {
          category: category,
          output: textInput
        }
        res.render('testRESULT', templateVars);
      } else if(typesArray.includes('Book') || typesArray.includes('FictionalCharacter')) {
        category.push('read');
        let templateVars = {
          category: category,
          output: textInput
        }
        res.render('testRESULT', templateVars);
      } else if (typesArray.includes('ConsumerProductsPTE')) {
        category.push('buy');
        let templateVars = {
          category: category,
          output: textInput
        }
        res.render('testRESULT', templateVars);
      }
      else //if the textInput is not a book, movie or TV show
      {

        let yelpOptions = {
          uri: 'https://api.yelp.com/v3/businesses/search',
          headers:{
            'Authorization':'Bearer X0dL6JkQu1HPY_GBOtelCfxSgU3it0hPAOYPy99ciP5qaKNce1-vrh1AD_aI6hqTT5UIJt9Gi5HLlPzclzpCRU63AKi25bf1Fhc128ms3s3wgYxaN6SmRVci28qtXXYx'
          },
          qs:{
            term: textInput,
            location: 'Toronto',
            categories: 'food',
            limit: 5
          },
          json:true
        }

        rp(yelpOptions).then((data) => {
          if(data.total > 0) {
            category.push('eat');
            let templateVars = {
              category: category,
              output: textInput
            }
            res.render('testRESULT', templateVars);
          } else {
            category.push('unknown');
            let templateVars = {
              category: category,
              output: textInput
            }
            res.render('testRESULT', templateVars);
          }
        }).catch( (err) => {
          console.log(err);
          res.redirect('/testFORM');
        })
        // let templateVars = {
        //   category: ['Unknown'],
        //   output: textInput
        // }
        // res.render('testRESULT', templateVars);
      }
      console.log('TOTAL DATA =', data);
      console.log('TYPESSTRING = ',typesString);

      //console.log('TEMPLATEVARS =', templateVars);

    }).catch((err) => {
      console.log(err);
    });

    // let yelpOptions = {
    //   uri: 'https://api.yelp.com/v3/businesses/search',
    //   headers:{
    //     'Authorization':'Bearer X0dL6JkQu1HPY_GBOtelCfxSgU3it0hPAOYPy99ciP5qaKNce1-vrh1AD_aI6hqTT5UIJt9Gi5HLlPzclzpCRU63AKi25bf1Fhc128ms3s3wgYxaN6SmRVci28qtXXYx'
    //   },
    //   qs:{
    //     term: textInput,
    //     location: 'Toronto',
    //     categories: 'food',
    //     limit: 5
    //   },
    //   json:true
    // }

    // rp(yelpOptions).then((data) => {
    //   if(data.total > 0){
    //     category.push('eat')
    //     let templateVars = {
    //       category: category
    //     }
    //     res.render('testRESULT', templateVars);
    //   } else {
    //     let templateVars = {
    //       category: ['not a food option']
    //     }
    //     res.render('testRESULT', templateVars);
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });


  }


})

