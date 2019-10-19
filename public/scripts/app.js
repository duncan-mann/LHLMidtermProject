// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

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

module.exports.getUserToDos = getUserToDos;