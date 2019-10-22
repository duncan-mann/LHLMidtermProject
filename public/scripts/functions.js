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

})

window.onload = function () {
  Particles.init({
    selector: '.background-canvas',
    minDistance: 100,
    connectParticles: true
  });
}


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


//particle




