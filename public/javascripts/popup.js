var spans = document.getElementsByClassName("close");
var btns = document.getElementsByClassName("close-btn");

// When the user clicks on <span> (x), close the modal
for (const span of spans) {
    span.onclick = function() {
        for (const modal of modals) {
            modal.style.display = "none";
        }
    }
}

for (const btn of btns) {
    btn.onclick = function() {
        for (const modal of modals) {
            modal.style.display = "none";
        }
    }
}