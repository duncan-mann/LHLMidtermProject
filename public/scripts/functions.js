//toggle menu
$(document).ready(function() {
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  })

//search bottom
  $("#addButton").click(function(e) {
    $("#searchbox").fadeIn(500);
  })

  $('#searchbox').click(function(e) {
    if(e.target.className !== 'search_input') {
      $('#searchbox').fadeOut(500);
    }
  })

  //click icon
  $('#logout').on('click', (e)=>{
    $('#logout').submit();
  })

  $('#dashboard').on('click', (e)=>{
    $('#dashboard').submit();
  })

  $('#readButton').on('click', (e)=>{
    $('#readButton').submit();
  })

  $('#eatButton').on('click', (e)=>{
    $('#eatButton').submit();
  })

  $('#watchButton').on('click', (e)=>{
    $('#watchButton').submit();
  })

  $('#buyButton').on('click', (e)=>{
    $('#eatButton').submit();
  })

  $('#profileForm').on('click', (e)=>{
    $('#profileForm').submit();
  })
})






