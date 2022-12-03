$("#create-post-popup").load("html/create-post.html");
$("#edit-post-popup").load("html/edit-post.html");
$("#delete-post-popup").load("html/delete-post.html");

var modals = document.getElementsByClassName("modal");

var createBtn = document.getElementById("create-post-btn");
var createModal = document.getElementById("create-post-popup");
createBtn.onclick = function() {
    createModal.style.display = "block";
};

var editBtns = document.getElementsByClassName("edit-post-btn");
var editModal = document.getElementById("edit-post-popup");

for (const btn of editBtns) {
    btn.onclick = function() {
        populateEditFields(btn.id);
        editModal.style.display = "block";
    };
}

var deleteBtns = document.getElementsByClassName("delete-post-btn");
var deleteModal = document.getElementById("delete-post-popup");

for (const btn of deleteBtns) {
    btn.onclick = function() {
        populateDeleteFields(btn.id);
        deleteModal.style.display = "block";
    };
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.className == "modal") {
        for (const modal of modals) {
            modal.style.display = "none";
        }
    }
};
