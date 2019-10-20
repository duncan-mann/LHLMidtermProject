const db = require('../database.js');

const getUserToDos = function(user_id) {

  return db.query(`
  SELECT *
  FROM to_dos
  WHERE user_id = $1
  `, [user_id])
  .then(res => res.rows)
  .catch(e => null)

}

  const addUser = function (user) {
    const insertString = `INSERT INTO users(name, email, password) VALUEs ($1, $2, $3)`
    return db.query (insertString, [user.name, user.email, user.password])
    .then(res => console.log(res.rows))
    .catch(e => console.error('query error: ', e.stack))
  }

module.exports.getUserToDos = getUserToDos;
