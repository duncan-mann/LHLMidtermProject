//toggle menu
$(document).ready(function() {

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  }).click()

//search bottom
  $("#addButton").click(function(e) {
    $("#searchbox").fadeIn(300);
    $("input").focus();
  })

  $('#searchbox').click(function(e) {
    if(e.target.className !== 'search_input') {
      $('#searchbox').fadeOut(300);
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
    $('#buyButton').submit();
  })

  $('#completeButton').on('click', (e)=>{
    $('#completeButton').submit();
  })

  $('#profileForm').on('click', (e)=>{
    $('#profileForm').submit();
  })

  $('#signIn-responsive').on('click', ()=>{
    $('.sign-in-container').fadeIn('slow');
    $('.sign-up-container').fadeOut('slow');
  })

  $('#Register-responsive').on('click', ()=>{
    $('.sign-up-container').fadeIn('slow');
    $('.sign-in-container').fadeOut('slow');
  })

})





