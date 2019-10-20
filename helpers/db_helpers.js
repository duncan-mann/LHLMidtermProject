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

// This function takes in an email, and then returns an object 'user', with the corresponding email and password of that user. 
// Server will verifiy that the password matches in POST /login request. 

const getUserByEmail = function(userEmail) {

  return db.query(`
    SELECT *
    FROM users
    `)
    .then(res => {
      let user = {
        email : userEmail,
        password : undefined
      }
      for (each of res.rows) {
        if (each.email === userEmail) {
          user.password = each.password;
          return user;
        }
      }
    return undefined})
  .catch(e => console.log('Error finding user', e.stack))
}
module.exports.getUserByEmail = getUserByEmail;
