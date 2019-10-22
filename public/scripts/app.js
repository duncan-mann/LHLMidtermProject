// $(document).ready(function() {

//   const createToDoItem = function(item) {
//     let icon;
//     let style;

//     if (item.category === 'books') {
//       icon = '<i class="fa fa-book" aria-hidden="true"></i>'
//       style = 'alert-primary'

//     } else if (item.category === 'movies') {
//       icon = '<i class="fa fa-film" aria-hidden="true"></i>'
//       style ='alert-success'

//     } else if (item.category === 'restaurant') {
//       icon = '<i class="fa fa-cutlery" aria-hidden="true "></i>'
//       style ='alert-warning'
      
//     } else if (item.category === 'product') {
//       icon = '<i class="fa fa-shopping-bag" aria-hidden="true"></i>'
//       style ='alert-danger'
//     }

//     let item = 
//     `<div class="alert ${style} to-do m-3 d-flex justify-content-between align-items-center" role="alert">
//     ${item.description}
//     ${icon}
//     <form method="POST" action="/completeToDoItem/<%= todo.id %>" class="to-do-form">
//     <button type="submit" class="btn btn-outline-dark btn-sm">Done!</button>
//     </form>
//   </div>`;

//   return item; 
//   }

//   const renderToDos = function(toDos) {
//     let section = document.getElementsByClassName('to-do-container');
//     $(section).empty();
  
//     for (each of toDos) {
//       let item = createToDoItem(each);
//       $(section).append(item);
//     }
//   }

//   let getToDos = async function() {
    
//     await $.ajax({
//     url: '/todos',
//     type: 'GET',
//     data : 'data',
//     dataType: 'JSON'
//     }).then( (data)=> {
//       renderToDos(data);
//     })
//   }
  
//   getToDos();

//   // $('.to-do-form').submit( async function(event) {
//   //   // event.preventDefault();
//   //   try {
//   //     const response = await $.ajax({
//   //       url: '/completeToDoItem/:toDoId',
//   //       type: 'POST',
//   //        data: text,
//   //     })
  
//   //   } catch (error) {
//   //     console.error(error)
//   //     }
      

//     }
//     })
// }) 

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
//  });


$(document).ready(function() {

$('.form').submit(function(event) {
  
  console.log('word');
  event.preventDefault();

});


  // $('.form').submit(async function() {

  //   await $.ajax({
  //       method: "POST",
  //       url: "/testAPI",
  //       // data: 'JSON'
  //   }).then(() => {
  //     console.log('word');
  //     // INSERT data to database
  //   })

  //   })

  })


  


