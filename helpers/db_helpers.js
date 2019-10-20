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