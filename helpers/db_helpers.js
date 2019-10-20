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

const getUserByEmail = function(userEmail) {
// This function takes in an email, and then returns an object 'user', with the corresponding email and password of that user. 
// Server will verifiy that the password matches in POST /login request. 
  return db.query(
    `SELECT *
    FROM users
    WHERE email = $1`
  [userEmail]).then(res => {
    const user = {
      email = res.rows[0].email,
      password = res.rows[0].password
    }
    return user})
  .catch(e => console.log('User could not be found: ', e.stack))
}
module.exports.getUsersByEmail = getUsersByEmail;
