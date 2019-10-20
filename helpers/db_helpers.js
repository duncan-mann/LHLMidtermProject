const db = require('../database.js');

const getUserToDos = function(user_id) {

  return db.query(`
  SELECT *
  FROM to_dos
  WHERE user_id = $1
  `, [user_id])
  .then(res => console.log(res.rows))
  .catch(e => console.error('query error: ', e.stack))

}

  const addUser = function (user) {
    const insertString = `INSERT INTO users(username, email, password) VALUES ($1, $2, $3)`
    return db.query (insertString, [user.username, user.email, user.password])
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error('query error: ', e.stack))
  }

  const checkEmailandUser = function (userinput, emailinput) {
    const insertString = `SElECT * FROM users WHERE username = $1 OR email = $2`
    return db.query(insertString, [[userinput, emailinput]])
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error('query error: ', e.stack))
  }

module.exports.getUserToDos = { getUserToDos };
module.exports.addUser = { addUser };
module.exports.checkEmailandUser = { checkEmailandUser };
