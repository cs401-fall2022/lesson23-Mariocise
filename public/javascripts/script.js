//$( "#create-post-btn" ).html("new text");
$("#create-post-popup").load("html/create-post.html");

var btn = document.getElementById("create-post-btn");
var modal = document.getElementById("create-post-popup");
btn.onclick = function() {
    modal.style.display = "block";
};
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
