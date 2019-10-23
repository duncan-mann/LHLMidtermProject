const db = require('../database.js');

const getUserToDos = function(user_id) {

  return db.query(`
  SELECT to_dos.*, users.username, users.first_name, users.last_name
  FROM to_dos
  JOIN users ON to_dos.user_id = users.id
  WHERE user_id = $1
  ORDER BY created_at
  `, [user_id])
  .then(res => {
    if (res.rows.length > 0) {
    return res.rows}
    else {
    return undefined }
    })
  .catch(e => console.error('query error: ', e.stack))

}
module.exports.getUserToDos = getUserToDos;

const getToDosByCategory= function(user_id, category) {
  return db.query(`
  SELECT to_dos.*, users.username, users.first_name, users.last_name
  FROM to_dos
  JOIN users ON to_dos.user_id = users.id
  WHERE user_id = $1 AND category = $2
  `, [user_id, category])
  .then(res => {
    if (res.rows.length > 0) {
    return res.rows}
    else {
    return undefined }
    })
  .catch(e => console.error('query error: ', e.stack))
}

module.exports.getToDosByCategory = getToDosByCategory;


const comepleteToDoItem = function(toDoId) {

  return db.query(`
  UPDATE to_dos
  SET complete = TRUE
  WHERE id = $1`, [toDoId])
  .then(res => res.rows)
  .catch(e => console.error('query error: ', e.stack))
}

module.exports.comepleteToDoItem = comepleteToDoItem;



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

const getUserById = function(userId) {

  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1`, [userId])
    .then(res => res.rows)
  .catch(e => console.log('Error finding user', e.stack))
}
module.exports.getUserById = getUserById;

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

const insertItemToDatabase = function(category, item, user) {
  // let user = req.session.userId


  return db.query(
  `INSERT INTO to_dos (user_id, description, category, created_at)
  VALUES ($1, $2, $3, NOW())`, [user, item, category])
  .then(res => res.rows)
  .catch(e => console.error('query error: ', e.stack))
};
module.exports.insertItemToDatabase = insertItemToDatabase;

const editToDoItem = function(toDoId, newDescription, newCategory) {

  return db.query( 
  `UPDATE to_dos
  SET description = $1,
  category = $2
  WHERE to_dos.id = $3
  `, [newDescription, newCategory, toDoId])
  .then(res => res.rows)
  .catch(e => console.error('query error: ', e.stack))
  
}

module.exports.editToDoItem = editToDoItem;

const editProfile = function(userId, userInfo) {

  return db.query( 
    `UPDATE users
    SET first_name = $2,
    last_name = $3,
    email = $4, 
    username = $5,
    password = $6
    WHERE id = $1
    `, [userId, userInfo.firstname, userInfo.lastname, userInfo.email, userInfo.username, userInfo.password])
    .then(res => res.rows)
    .catch(e => console.error('query error: ', e.stack))

}

module.exports.editProfile = editProfile;