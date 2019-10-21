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
});
//slide register
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});


