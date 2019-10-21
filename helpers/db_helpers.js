const db = require('../database.js');

const getUserToDos = function(user_id) {

  return db.query(`
  SELECT *
  FROM to_dos
  WHERE user_id = $1
  `, [user_id])
  .then(res => res.rows)
  .catch(e => console.error('query error: ', e.stack))

}
module.exports.getUserToDos = getUserToDos;

  const addUser = function (user) {
    const insertString = `INSERT INTO users(username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`
    return db.query (insertString, [user.username, user.firstname, user.lastname, user.email, user.password])
    .then(res => res.rows[0])
    .catch(e => console.error('query error: ', e.stack))
  }

  const checkEmailandUser = function (userInput, emailInput) {
    const insertString = `SElECT * FROM users WHERE username = $1 OR email = $2`
    return db.query(insertString, [userInput, emailInput])
    .then(res => res.rows[0])
    .catch(e => console.error('query error: ', e.stack))
  }

module.exports.getUserToDos = getUserToDos;
module.exports.addUser = addUser ;
module.exports.checkEmailandUser = checkEmailandUser;
// This function takes in an email, and then returns an object 'user', with the corresponding email and password of that user. 
// Server will verifiy that the password matches in POST /login request. 

const getUserByEmail = function(userEmail) {

  return db.query(`
    SELECT *
    FROM users
    `)
    .then(res => {
      for (each of res.rows) {
        if (each.email === userEmail) {
          return each;
        }
      }
    return undefined})
  .catch(e => console.log('Error finding user', e.stack))
}
module.exports.getUserByEmail = getUserByEmail;

const generateRandomString = function() {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports.generateRandomString = generateRandomString;
