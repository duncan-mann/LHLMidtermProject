const rp = require('request-promise');

const apiKeys = {
  reads: 'AIzaSyDkAaNqM-rrsIlINq7WPcygTgIWBlon1Do',
  movies: 2,
  eats: 3,
  buys: 4,
  wolfram: '9YR6T5-RYTW4PTK83'
}

const apiUrls = {
  reads: 'https://www.googleapis.com/books/v1/volumes',
  movies: 2,
  eats: 3,
  buys: 4
}

const getItems = function(type, query){
  switch(type){
    case 'reads'||'r':
      return getReads(query);
      break;
    case 'movies'||'m':
      console.log(query, type);
      break;
    case 'eats' || 'e':
      console.log(query, type);
      break;
    case 'buys' || 'b':
      console.log(query, type);
      break;
  }
}

const getReads =  async function(name_of_book){
  let options = {

  }
  await rp('')
}

module.exports = {
  getItems
}
